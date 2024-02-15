import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
export default function VendorHome() {

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
                        <Link to="updateservices" className="nav-link">Update Services</Link>
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