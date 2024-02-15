import { useState, useReducer } from "react";
import CustomerSignUp from "../components/CustomerSignUp";
import VendorSignUp from "../components/VendorSignUp";

function Registration() {
    const [userType, setUserType] = useState(null);

    const handleLogin = (type) => {
        setUserType(type);
        // You can add logic here to redirect to the appropriate login page based on type
    };

    return (
        <div className="container mt-5">
            <div className="row">
                {/*vendor registration*/}
                <div className="col-md-6">
                    <button className="btn btn-primary btn-block" onClick={() => handleLogin(1)}>VendorSignUp</button>
                </div>
                {/*Customer registration*/}
                <div className="col-md-6">
                    <button className="btn btn-primary btn-block" onClick={() => handleLogin(2)}>CustomerSignUp</button>
                </div>
            </div>

            {userType === 1 && <VendorSignUp />}
            {userType === 2 && <CustomerSignUp />}
        </div>
    );
}
export default Registration;
