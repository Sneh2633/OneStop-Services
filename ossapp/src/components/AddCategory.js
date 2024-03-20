
import React, { useState, useReducer } from "react";

const AddCategory = () => {
    const initialState = {
        service: { value: "", valid: false, touched: false, error: "" },
    };

    const formReducer = (state, action) => {
        switch (action.type) {
            case "update":
                const { key, value, touched, valid, error } = action.data;
                return { ...state, [key]: { value, touched, valid, error } };
            case "reset":
                return initialState;
            default:
                return state;
        }
    };

    const [formState, dispatch] = useReducer(formReducer, initialState);
    const [insertMsg, setInsertMsg] = useState("");
    const [apiError, setApiError] = useState("");

    const validateData = (key, val) => {
        let valid = true;
        let error = "";
        switch (key) {
            case "service":
                //var pattern = /^[A-Z]{1}[a-z]{1,} $/;
                var pattern = /^[A-Z][a-z]*(?:\s[A-Z][a-z]*)*$/;
                if (!pattern.test(val)) {
                    valid = false;
                    error = "Invalid Service Name";
                }
                break;
            default:
                break;
        }
        return { valid: valid, error: error };
    };

    const handleChange = (key, value) => {
        const { valid, error } = validateData(key, value);
        dispatch({ type: "update", data: { key, value, touched: true, valid, error } });
    };

    const submitData = (e) => {
        e.preventDefault();
        const isFormValid = Object.values(formState).every((field) => field.valid);

        if (isFormValid) {
            const reqOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ServiceName: formState.service.value,
                }),
            };

            fetch('https://localhost:7017/api/Category', reqOptions)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error("This Service is already exixts.");
                    }
                    else{
                        alert("Service added successfully..!!");
                    }
                    //return res.text();
                })
                .then((data) => {
                    // Clear API error message if successful
                    setApiError("");
                    setInsertMsg(data);
                })
                

                .catch((error) => {
                    console.error("Error:", error.message);
                    setApiError(`An error occurred: ${error.message}. Please add another service.`);
                });
        } else {
            console.log("Form has validation errors. Please fix them before submitting.");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col"></div>

                <div className="col">
                    <h1> Category </h1>
                    <form>
                        <div className="mt-3 mb-3">
                            <label htmlFor="service" className="form-label">
                                {" "}
                                Category Name{" "}
                            </label>
                            <input
                                type="text"
                                id="service"
                                name="service"
                                className="form-control"
                                value={formState.service.value}
                                onChange={(e) => handleChange("service", e.target.value)}
                                onBlur={(e) => handleChange("service", e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                color: "Red",
                                display: formState.service.touched && !formState.service.valid ? "block" : "none",
                            }}
                        >
                            {formState.service.error}
                        </div>

                        <div style={{ color: "Red" }}>
                            {apiError}
                        </div>

                        <div>
                            <input
                                type="button"
                                className="btn btn-primary btn-block"
                                value="Add"
                                onClick={(e) => submitData(e)}
                            />
                            &nbsp;&nbsp;
                            <input
                                type="reset"
                                className="btn btn-primary btn-block"
                                value="Clear"
                                onClick={() => dispatch({ type: "reset" })}
                            />
                        </div>
                    </form>
                </div>

                <div className="col"></div>
            </div>
        </div>
    );
};

export default AddCategory;




