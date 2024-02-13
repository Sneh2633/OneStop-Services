import { useState, useReducer, useEffect } from "react";

export default function VendorSignUp() {
    const init = {
        fname: { value: "", valid: false, touched: false, error: "" },
        lname: { value: "", valid: false, touched: false, error: "" },
        username: { value: "", valid: false, touched: false, error: "" },
        contact: { value: "", valid: false, touched: false, error: "" },
        address: { value: "", valid: false, touched: false, error: "" },
        email: { value: "", valid: false, touched: false, error: "" },
        password: { value: "", valid: false, touched: false, error: "" },
        service: { value: "", valid: false, touched: false, error: "" },
       // price: { value: "", valid: false, touched: false, error: "" }
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "update":
                const { key, value, touched, valid, error } = action.data;
                return { ...state, [key]: { value, touched, valid, error } };
            case "reset":
                return init;
            default:
                return state;
        }
    };

    const [bookings, dispatch] = useReducer(reducer, init);
    const [insertMsg, setInsertMsg] = useState("");
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch("http://localhost:8080/getServices");
                if (response.ok) {
                    const data = await response.json();
                    setServices(data);
                } else {
                    console.error("Failed to fetch services. Status:", response.status);
                }
            } catch (error) {
                console.error("Error fetching services:", error.message);
            }
        };

        fetchServices();
    }, []);

    const validateData = (key, val) => {
        let valid = true;
        let error = "";

        switch (key) {
            case "contact":
    var pattern = /^[0-9]+$/;
    if (!pattern.test(val)) {
        valid = false;
        error = "Invalid Contact";
    }
    break;

            case "fname":
            case "lname":
                var pattern = /^[A-Za-z]+$/;
                if (!pattern.test(val)) {
                    valid = false;
                    error = "Invalid Name";
                }
                break;

            case "address":
                var pattern = /.+/;
                if (!pattern.test(val)) {
                    valid = false;
                    error = "Invalid Address";
                }
                break;

                case "username":
                    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                    if (!pattern.test(val)) {
                        valid = false;
                        error = "Invalid Username";
                    }
                    break;

            case "password":
                var pattern = /^[A-Za-z0-9@]+$/;
                if (!pattern.test(val)) {
                    valid = false;
                    error = "Invalid Password";
                }
                break;

            case "service":
                if (!val) {
                    valid = false;
                    error = "Please select a service";
                }
                break;

            default:
                break;
        }

        console.log(`Validation for ${key}: valid=${valid}, error=${error}`);
        return { valid: valid, error: error };
    };

    const handleChange = (key, value) => {
        const { valid, error } = validateData(key, value);
        dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
        console.log("Updated State:", bookings);
    };
    

    const submitData = (e) => {
        e.preventDefault();
        const isFormValid = Object.values(bookings).every((field) => field.valid);

        if (isFormValid) {
            console.log(JSON.stringify(bookings));
            const reqOptions = {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    fname: bookings.fname.value,
                    lname: bookings.lname.value,
                    username: bookings.username.value,
                    contact: bookings.contact.value,
                    address: bookings.address.value,
                    email: bookings.email.value,
                    password: bookings.password.value,
                    serviceid: parseInt(bookings.service.value), // Use serviceid instead of service
                    //price: bookings.price.value
                }),
            };

            fetch("http://localhost:8080/regVendor", reqOptions)
                .then((res) => {
                    if (res.status === 200) {
                        setInsertMsg("Registration successful");
                    } else if (res.status === 400) {
                        return res.json().then((data) => {
                            console.error("Validation error:", data);
                            setInsertMsg("Validation error. Please check your input.");
                        });
                    } else {
                        throw new Error(`HTTP error! Status: ${res.status}`);
                    }
                })
                .catch((error) => {
                    console.error("There was a problem with the fetch operation:", error.message);
                    setInsertMsg("Registration failed. Please try again later.");
                });
        } else {
            console.log("Form has validation errors. Please fix them before submitting.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <h1> VendorSignUp </h1>
                                         <form>
                         <div className="mt-3 mb-3">
                            <label htmlFor="fname" className="form-label"> First Name </label>
                             <input type="text" id="fname" name="fname" className="form-control"
                                value={bookings.fname.value}
                                onChange={(e) => { handleChange("fname", e.target.value) }}
                                onBlur={(e) => { handleChange("fname", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.fname.touched && !bookings.fname.valid ? "block" : "none" }}>
                            {bookings.fname.error}
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="lname" className="form-label"> Last Name </label>
                            <input type="text" id="lname" name="lname" className="form-control"
                                value={bookings.lname.value}
                                onChange={(e) => { handleChange("lname", e.target.value) }}
                                onBlur={(e) => { handleChange("lname", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.lname.touched && !bookings.lname.valid ? "block" : "none" }}>
                            {bookings.lname.error}
                        </div>


                        <div className="mt-3 mb-3">
                            <label htmlFor="username" className="form-label"> Username </label>
                            <input type="text" id="username" name="username" className="form-control"
                                value={bookings.username.value}
                                onChange={(e) => { handleChange("username", e.target.value) }}
                                onBlur={(e) => { handleChange("username", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.username.touched && !bookings.username.valid ? "block" : "none" }}>
                            {bookings.username.error}
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="contact" className="form-label"> Contact </label>
                            <input type="number" id="contact" name="contact" className="form-control"
                                value={bookings.contact.value}
                                onChange={(e) => { handleChange("contact", e.target.value) }}
                                onBlur={(e) => { handleChange("contact", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.contact.touched && !bookings.contact.valid ? "block" : "none" }}>
                            {bookings.contact.error}
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="address" className="form-label"> Address </label>
                            <input type="text" id="address" name="address" className="form-control"
                                value={bookings.address.value}
                                onChange={(e) => { handleChange("address", e.target.value) }}
                                onBlur={(e) => { handleChange("address", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.address.touched && !bookings.address.valid ? "block" : "none" }}>
                            {bookings.address.error}
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="email" className="form-label"> Email </label>
                            <input type="email" id="email" name="email" className="form-control"
                                value={bookings.email.value}
                                onChange={(e) => { handleChange("email", e.target.value) }}
                                onBlur={(e) => { handleChange("email", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.email.touched && !bookings.email.valid ? "block" : "none" }}>
                            {bookings.email.error}
                        </div>

                        <div className="mt-3 mb-3">
                            <label htmlFor="password" className="form-label"> Password </label>
                            <input type="password" id="password" name="password" className="form-control"
                                value={bookings.password.value}
                                onChange={(e) => { handleChange("password", e.target.value) }}
                                onBlur={(e) => { handleChange("password", e.target.value) }} />
                        </div>
                        <div style={{ color: "Red", display: bookings.password.touched && !bookings.password.valid ? "block" : "none" }}>
                            {bookings.password.error}
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="service" className="form-label"> Service </label>
                            <select
                                id="service"
                                name="service"
                                className="form-control"
                                value={bookings.service.value}
                                onChange={(e) => {
                                    handleChange("service", e.target.value);
                                }}
                                onBlur={(e) => {
                                    handleChange("service", e.target.value);
                                }}
                            >
                                <option value="">Select</option>
                                {services.map((service) => (
                                    <option key={service.service_id} value={service.service_id}>
                                        {service.service_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div style={{ color: "Red", display: bookings.service.touched && !bookings.service.valid ? "block" : "none" }}>
                            {bookings.service.error}
                        </div>


                        <div>
                            <input type="button" className="btn btn-primary btn-block" value="register" onClick={(e) => { submitData(e) }} />
                            &nbsp;&nbsp;
                            <input type="reset" className="btn btn-primary btn-block" value="Clear" onClick={() => { dispatch({ type: "reset" }); }} />
                        </div>
                    </form>
                </div>
                <div className="col">
                </div>
            </div>
            <h1> {insertMsg} </h1>
        </div>
    );
};












































// import { useState, useReducer, useEffect } from "react";

// export default function VendorSignUp() {
//     // Your vendor login form component
//     const init = {
//         fname: { value: "", valid: false, touched: false, error: "" },
//         lname: { value: "", valid: false, touched: false, error: "" },
//         username: { value: "", valid: false, touched: false, error: "" },
//         contact: { value: "", valid: false, touched: false, error: "" },
//         address: { value: "", valid: false, touched: false, error: "" },
//         email: { value: "", valid: false, touched: false, error: "" },
//         password: { value: "", valid: false, touched: false, error: "" },
//         serviceid: { value: "", valid: false, touched: false, error: "" },
//         price: { value: "", valid: false, touched: false, error: "" }
//     };

//     const reducer = (state, action) => {
//         switch (action.type) {
//             case "update":
//                 const { key, value, touched, valid, error } = action.data;
//                 return { ...state, [key]: { value, touched, valid, error } };
//             case "reset":
//                 return init;
//             default:
//                 return state;
//         }
//     };

//     const [bookings, dispatch] = useReducer(reducer, init);
//     const [insertMsg, setInsertMsg] = useState("");
//     const [services, setServices] = useState([]); // Define services state

//     // // Fetch services data when component mounts
//     // useEffect(() => {
//     //     fetchServices();
//     // }, []);

//     // Fetch services data when component mounts
//     useEffect(() => {
//         const fetchServices = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/getServices");
//                 if (response.ok) {
//                     const data = await response.json();
//                     setServices(data); // Update the services state with the received data
//                 } else {
//                     console.error("Failed to fetch services. Status:", response.status);
//                 }
//             } catch (error) {
//                 console.error("Error fetching services:", error.message);
//             }
//         };

//         fetchServices();
//     }, []); // The empty dependency array ensures that this effect runs only once when the component mounts




//     const validateData = (key, val) => {
//         let valid = true;
//         let error = "";
//         switch (key) {
//             case "contact":
//                 var pattern = /^[0-9]{10}$/;
//                 if (!pattern.test(val)) {
//                     valid = false;
//                     error = "Invalid Contact";
//                 }
//                 break;

//             case "fname":
//             case "lname":
//                 var pattern = /^[A-Z]{1}[a-z]{1,}$/;
//                 if (!pattern.test(val)) {
//                     valid = false;
//                     error = "Invalid Name";
//                 }
//                 break;

//             case "address":
//                 var pattern = /\w{1,}\W{1,}/;
//                 if (!pattern.test(val)) {
//                     valid = false;
//                     error = "Invalid Address";
//                 }
//                 break;

//             case "username":
//                 var pattern = /^[a-z]{1,}[@][a-z]{1,}[.][a-z]{1,}$/;
//                 if (!pattern.test(val)) {
//                     valid = false;
//                     error = "Invalid Username";
//                 }
//                 break;

//             case "password":
//                 var pattern = /^[A-Z]{1}[a-z]{1,}[@][0-9]{1,}$/;
//                 if (!pattern.test(val)) {
//                     valid = false;
//                     error = "Invalid Password";
//                 }
//                 break;

//             case "serviceid":
//                 if (!val) {
//                     valid = false;
//                     error = "Please select a service";
//                 }
//                 break;

//             default:
//                 break;
//         } console.log(`Validation for ${key}: valid=${valid}, error=${error}`);
//         return { valid: valid, error: error };
    
//     };

//     const handleChange = (key, value) => {
//         const { valid, error } = validateData(key, value);
//         dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
//     };

//     // const submitData = (e) => {
//     //     e.preventDefault();
//     //     const isFormValid = Object.values(bookings).every((field) => field.valid);

//     //     if (isFormValid) {
//     //         console.log(JSON.stringify(bookings));
//     //         const reqOptions = {
//     //             method: "POST",
//     //             headers: { "content-type": "application/json" },
//     //             body: JSON.stringify({
//     //                 fname: bookings.fname.value,
//     //                 lname: bookings.lname.value,
//     //                 username: bookings.username.value,
//     //                 contact: bookings.contact.value,
//     //                 address: bookings.address.value,
//     //                 email: bookings.email.value,
//     //                 password: bookings.password.value,
//     //                 service: bookings.service.value // Include service id in the request
//     //             }),
//     //         };

//     //         fetch("http://localhost:8080/regVendor", reqOptions)
//     //             .then((res) => {
//     //                 if (res.status === 200) {
//     //                     // Registration successful
//     //                     setInsertMsg("Registration successful");
//     //                 } else if (res.status === 400) {
//     //                     // Bad request, handle validation errors
//     //                     return res.json().then((data) => {
//     //                         // Handle validation errors from the server
//     //                         console.error("Validation error:", data);
//     //                         setInsertMsg("Validation error. Please check your input.");
//     //                     });
//     //                 } else {
//     //                     // Other HTTP errors
//     //                     throw new Error(`HTTP error! Status: ${res.status}`);
//     //                 }
//     //             })
//     //             .catch((error) => {
//     //                 // Handle network errors and other exceptions here
//     //                 console.error("There was a problem with the fetch operation:", error.message);
//     //                 setInsertMsg("Registration failed. Please try again later.");
//     //             });
//     //     } else {
//     //         console.log("Form has validation errors. Please fix them before submitting.");
//     //     }
//     // };

//     const submitData = (e) => {
//         e.preventDefault();
//         const isFormValid = Object.values(bookings).every((field) => field.valid);
    
//         if (!isFormValid) {
//             console.log(JSON.stringify(bookings));
//             const reqOptions = {
//                 method: "POST",
//                 headers: { "content-type": "application/json" },
//                 body: JSON.stringify({
//                     fname: bookings.fname.value,
//                     lname: bookings.lname.value,
//                     username: bookings.username.value,
//                     contact: bookings.contact.value,
//                     address: bookings.address.value,
//                     email: bookings.email.value,
//                     password: bookings.password.value,
//                     serviceid: bookings.serviceid.value,
//                     price: bookings.price.value // Include price in the request
//                 }),
//             };
    
//             fetch("http://localhost:8080/regVendor", reqOptions)
//                 .then((res) => {
//                     if (res.status === 200) {
//                         // Registration successful
//                         setInsertMsg("Registration successful");
//                     } else if (res.status === 400) {
//                         // Bad request, handle validation errors
//                         return res.json().then((data) => {
//                             // Handle validation errors from the server
//                             console.error("Validation error:", data);
//                             setInsertMsg("Validation error. Please check your input.");
//                         });
//                     } else {
//                         // Other HTTP errors
//                         throw new Error(`HTTP error! Status: ${res.status}`);
//                     }
//                 })
//                 .catch((error) => {
//                     // Handle network errors and other exceptions here
//                     console.error("There was a problem with the fetch operation:", error.message);
//                     setInsertMsg("Registration failed. Please try again later.");
//                 });
//         } else {
//             console.log("Form has validation errors. Please fix them before submitting.");
//         }
//     };
    
//     return (
//         <div className="container">

//             <div className="row">
//                 <div className="col">
//                 </div>

//                 <div className="col">
//                     <h1> VendorSignUp </h1>
//                     <form>
//                         <div className="mt-3 mb-3">
//                             <label htmlFor="fname" className="form-label"> First Name </label>
//                             <input type="text" id="fname" name="fname" className="form-control"
//                                 value={bookings.fname.value}
//                                 onChange={(e) => { handleChange("fname", e.target.value) }}
//                                 onBlur={(e) => { handleChange("fname", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.fname.touched && !bookings.fname.valid ? "block" : "none" }}>
//                             {bookings.fname.error}
//                         </div>

//                         <div className="mt-3 mb-3">
//                             <label htmlFor="lname" className="form-label"> Last Name </label>
//                             <input type="text" id="lname" name="lname" className="form-control"
//                                 value={bookings.lname.value}
//                                 onChange={(e) => { handleChange("lname", e.target.value) }}
//                                 onBlur={(e) => { handleChange("lname", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.lname.touched && !bookings.lname.valid ? "block" : "none" }}>
//                             {bookings.lname.error}
//                         </div>


//                         <div className="mt-3 mb-3">
//                             <label htmlFor="username" className="form-label"> Username </label>
//                             <input type="text" id="username" name="username" className="form-control"
//                                 value={bookings.username.value}
//                                 onChange={(e) => { handleChange("username", e.target.value) }}
//                                 onBlur={(e) => { handleChange("username", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.username.touched && !bookings.username.valid ? "block" : "none" }}>
//                             {bookings.username.error}
//                         </div>

//                         <div className="mt-3 mb-3">
//                             <label htmlFor="contact" className="form-label"> Contact </label>
//                             <input type="number" id="contact" name="contact" className="form-control"
//                                 value={bookings.contact.value}
//                                 onChange={(e) => { handleChange("contact", e.target.value) }}
//                                 onBlur={(e) => { handleChange("contact", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.contact.touched && !bookings.contact.valid ? "block" : "none" }}>
//                             {bookings.contact.error}
//                         </div>

//                         <div className="mt-3 mb-3">
//                             <label htmlFor="address" className="form-label"> Address </label>
//                             <input type="text" id="address" name="address" className="form-control"
//                                 value={bookings.address.value}
//                                 onChange={(e) => { handleChange("address", e.target.value) }}
//                                 onBlur={(e) => { handleChange("address", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.address.touched && !bookings.address.valid ? "block" : "none" }}>
//                             {bookings.address.error}
//                         </div>

//                         <div className="mt-3 mb-3">
//                             <label htmlFor="email" className="form-label"> Email </label>
//                             <input type="email" id="email" name="email" className="form-control"
//                                 value={bookings.email.value}
//                                 onChange={(e) => { handleChange("email", e.target.value) }}
//                                 onBlur={(e) => { handleChange("email", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.email.touched && !bookings.email.valid ? "block" : "none" }}>
//                             {bookings.email.error}
//                         </div>

//                         <div className="mt-3 mb-3">
//                             <label htmlFor="password" className="form-label"> Password </label>
//                             <input type="password" id="password" name="password" className="form-control"
//                                 value={bookings.password.value}
//                                 onChange={(e) => { handleChange("password", e.target.value) }}
//                                 onBlur={(e) => { handleChange("password", e.target.value) }} />
//                         </div>
//                         <div style={{ color: "Red", display: bookings.password.touched && !bookings.password.valid ? "block" : "none" }}>
//                             {bookings.password.error}
//                         </div>

//                         <div className="mt-3 mb-3">
//                             <label htmlFor="serviceid" className="form-label"> Service </label>
//                             <select
//                                 id="service"
//                                 name="service"
//                                 className="form-control"
//                                 value={bookings.service.value}
//                                 onChange={(e) => {
//                                     handleChange("serviceid", e.target.value);
//                                 }}
//                                 onBlur={(e) => {
//                                     handleChange("serviceid", e.target.value);
//                                 }}
//                             >
//                                 <option value="">Select</option>
//                                 {services.map((service) => (
//                                     <option key={service.service_id} value={service.service_id}>
//                                         {service.service_name}
//                                     </option>
//                                 ))}

//                             </select>
//                         </div>
//                         <div style={{ color: "Red", display: bookings.service.touched && !bookings.service.valid ? "block" : "none" }}>
//                             {bookings.service.error}
//                         </div>


//                         <div>
//                             <input type="button" className="btn btn-primary btn-block" value="register" onClick={(e) => { submitData(e) }} />
//                             &nbsp;&nbsp;
//                             <input type="reset" className="btn btn-primary btn-block" value="Clear" onClick={() => { dispatch({ type: "reset" }); }} />
//                         </div>
//                     </form>
//                 </div>

//                 <div className="col">
//                 </div>
//             </div>


//             <h1> {insertMsg} </h1>
//         </div>
//     );
// };

