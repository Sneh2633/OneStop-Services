import { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddService() {
  useEffect(()=> {
    const vid = JSON.parse(localStorage.getItem("loggedVendor")).vendor_id;
    const catid = JSON.parse(localStorage.getItem("loggedVendor")).serviceid.service_id;

    console.log(vid);
    console.log(catid);
    /*fetch("http://localhost:8080/getsubService?catid="+catid)
    .then(resp => {
        console.log(resp.status)
        if(resp.ok)
            return resp.json();
        else
            throw new Error("server error")
    }) */
    /*.then(obj => localStorage.setItem("loggedVendor",JSON.stringify(obj)))
    .catch(error => console.log(error.toString()))*/
},[])




  const init = {
    cost: { value: "", valid: false, touched: false, error: "" },
    description: { value: "", valid: false, touched: false, error: "" },
    serviceName: { value: "", valid: false, touched: false, error: "" },
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
  {/*to navigate again login page after registration*/ }
  const navigate = useNavigate();


  const validateData = (key, val) => {
    let valid = true;
    let error = "";

    switch (key) {



      case "serviceName":
        var pattern2 = /.+/;
        if (!pattern2.test(val)) {
          valid = false;
          error = "Invalid description";
        }
        break;

      case "description":
        var pattern = /.+/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Invalid description";
        }
        break;
      case "cost":
        var pattern1 = /^\d+$/;
        if (!pattern1.test(val)) {
          valid = false;
          error = "Invalid cost";
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
          description: bookings.description.value,
          serviceName: bookings.serviceName.value,
          cost: bookings.cost.value,
          serviceid: parseInt(bookings.service.value), // Use serviceid instead of service
          //price: bookings.price.value
        }),
      };

      fetch("http://localhost:8080/regVendor", reqOptions)
        .then((res) => {
          if (res.status === 200) {
            setInsertMsg("Registration successful");
            alert("Registration successfull");

            {/*to navigate to login page */ }
            navigate("/login");

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
          <h1> Service Details </h1>
          <form>

            <div className="mt-3 mb-3">
              <label htmlFor="serviceName" className="form-label"> Service Name </label>
              <input type="text" id="serviceName" name="serviceName" className="form-control"
                value={bookings.serviceName.value}
                onChange={(e) => { handleChange("serviceName", e.target.value) }}
                onBlur={(e) => { handleChange("serviceName", e.target.value) }} />
            </div>
            <div style={{ color: "Red", display: bookings.serviceName.touched && !bookings.serviceName.valid ? "block" : "none" }}>
              {bookings.serviceName.error}
            </div>


            <div className="mt-3 mb-3">
              <label htmlFor="description" className="form-label"> Description </label>
              <input type="text" id="description" name="description" className="form-control"
                value={bookings.description.value}
                onChange={(e) => { handleChange("description", e.target.value) }}
                onBlur={(e) => { handleChange("description", e.target.value) }} />
            </div>
            <div style={{ color: "Red", display: bookings.description.touched && !bookings.description.valid ? "block" : "none" }}>
              {bookings.description.error}
            </div>

            <div className="mt-3 mb-3">
              <label htmlFor="cost" className="form-label"> Cost </label>
              <input type="number" id="cost" name="cost" className="form-control"
                value={bookings.cost.value}
                onChange={(e) => { handleChange("cost", e.target.value) }}
                onBlur={(e) => { handleChange("cost", e.target.value) }} />
            </div>
            <div style={{ color: "Red", display: bookings.cost.touched && !bookings.cost.valid ? "block" : "none" }}>
              {bookings.cost.error}
            </div>


            <div>
              <input type="button" className="btn btn-primary btn-block" value="Add" onClick={(e) => { submitData(e) }} />
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