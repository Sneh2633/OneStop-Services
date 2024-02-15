import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Navbar, NavDropdown } from 'react-bootstrap';

export default function CustomerHome() {
    const mystate = useSelector(state => state.logged);
    return (
        <div>
            <h1 style={{ marginLeft: 530 }}>OneStop Services</h1>
            <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
                <ul className="nav navbar">
                    <li className="nav-item">
                    <Navbar.Brand>CustomerHome</Navbar.Brand>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="searchvendors" className="nav-link">Search vendors</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="ordershistory" className="nav-link">Orders History</Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to="logout" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
}
