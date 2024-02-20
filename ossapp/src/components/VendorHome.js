import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import { useEffect } from "react";
export default function VendorHome() {

    const user = useSelector(state => state.logged.user); 
    console.log(user)
    useEffect(()=> {
        const userid =user.user_id;
        console.log(userid)
        fetch("http://localhost:8080/getVendor?userid="+userid)
        .then(resp => {
            console.log(resp.status)
            if(resp.ok)
                return resp.json();
            else
                throw new Error("server error")
        })
        .then(obj => localStorage.setItem("loggedVendor",JSON.stringify(obj)))
        .catch(error => console.log(error.toString()))
    },[])

    const mystate = useSelector(state => state.logged)
    return (
        <div>
            <h1 style={{ marginLeft: 530 }}>OneStop Services</h1>
            <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <ul className="nav navbar">
                    <li className="nav-item">
                    <Navbar.Brand>VendorHome</Navbar.Brand>
                    </li>
                    <li className="nav-item">
                        <Link to="customerrequests" className="nav-link">Customer Requests</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="addCost" className="nav-link">Add Cost</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="updateservices" className="nav-link">Update Cost</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="logout" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}