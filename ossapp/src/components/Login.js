import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../loggedSlice";

export default function Login() {
  const init = {
    username: { value: "", valid: false, touched: false, error: "" },
    password: { value: "", valid: false, touched: false, error: "" },
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
  const myaction = useDispatch();
  const mystate = useSelector((state) => state.logged);
  const navigate = useNavigate();

  const validateData = (key, val) => {
    let valid = true;
    let error = "";

    switch (key) {
      case "username":
        var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Invalid Username";
        }
        break;

      case "password":
        var pattern = /^[A-Z]{1}[a-z]{1,}[@][0-9]{1,}$/;
        if (!pattern.test(val)) {
          valid = false;
          error = "Invalid Password";
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

  // Moved useEffect outside of the callback function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userid = JSON.parse(localStorage.getItem("loggedUser")).user_id;
        console.log(userid)
        const response = await fetch("http://localhost:8080/getVendor?userid=" + userid);
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("loggedVendor", JSON.stringify(data));
        } else {
          throw new Error("Server error");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const submitData = (e) => {
    e.preventDefault();
    const isFormValid = Object.values(bookings).every((field) => field.valid);
  
    if (isFormValid) {
      const reqOptions = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: bookings.username.value,
          password: bookings.password.value,
        }),
      };
  
      fetch("http://localhost:8080/chklogin", reqOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          console.log(res)
          return res.json();
        })
        .then((data) => {
          if (data && data.roleid) {
            if (data.roleid.rid === 1) {
              navigate("/adminhome");
              myaction(login(data));
            } else if (data.roleid.rid === 2) {
              console.log("valid ");
              console.log("after dispatch");
              navigate("/customerhome");
              myaction(login(data));
            } else if (data.roleid.rid === 3) {
              console.log("valid ");
              console.log("after dispatch");
              navigate("/vendorhome");
              myaction(login(data));
            }
          } else {
            setInsertMsg("Invalid login or missing data");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setInsertMsg("Invalid Username or Password Or You are not authorised !!!");
        });
    } else {
      console.log("Form has validation errors. Please fix them before submitting.");
    }
  };
  
  

  return (
    <div className="container">
      <div class="row">
        <div class="col">
        </div>
        <div class="col">
          <h1>Login Form</h1>
          <form>
            <div class="mt-3 mb-3">
              <label for="username" class="form-label"> Username </label>
              <input type="text" id="username" name="username" class="form-control"
                value={bookings.username.value}
                onChange={(e) => { handleChange("username", e.target.value) }}
                onBlur={(e) => { handleChange("username", e.target.value) }} />
            </div>
            <div style={{ color: "Red", display: bookings.username.touched && !bookings.username.valid ? "block" : "none" }}>
              {bookings.username.error}
            </div>

            <div class="mt-3 mb-3">
              <label for="password" class="form-label"> Password </label>
              <input type="password" id="password" name="password" class="form-control"
                value={bookings.password.value}
                onChange={(e) => { handleChange("password", e.target.value) }}
                onBlur={(e) => { handleChange("password", e.target.value) }} />
            </div>
            <div style={{ color: "Red", display: bookings.password.touched && !bookings.password.valid ? "block" : "none" }}>
              {bookings.password.error}
            </div>

            <div>
              <input type="button" className="btn btn-primary btn-block" value="Login" onClick={(e) => { submitData(e) }} />
              &nbsp;&nbsp;
              <input type="reset" className="btn btn-primary btn-block" value="Clear" onClick={() => { dispatch({ type: "reset" }); }} />
            </div>
          </form>
        </div>
        <div class="col">
        </div>
      </div>
      <div class="container mt-4">
  <div class="d-flex justify-content-center ">
       {insertMsg} 
      </div>
      </div>
    </div>
  );
}
