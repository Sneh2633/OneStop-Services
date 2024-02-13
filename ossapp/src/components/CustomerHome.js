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
                    {/*<li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Services
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link to="electrician" className="dropdown-item">Electrician</Link>
                            <Link to="plumber" className="dropdown-item">Plumber</Link>
                            <Link to="carpenter" className="dropdown-item">Carpenter</Link>
                            <Link to="pestcontrol" className="dropdown-item">Cleaning & Pest Control</Link>
                            <Link to="appliances" className="dropdown-item">Appliances repair</Link>
                        </div>
                </li>*/}

                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item ><Link to="electrician" >Electrician</Link></NavDropdown.Item>
                        <NavDropdown.Item href="plumber">Plumber</NavDropdown.Item>
                        <NavDropdown.Item href="carpenter">Carpenter</NavDropdown.Item>
                        <NavDropdown.Item href="pestcontrol">Cleaning & Pest Control</NavDropdown.Item>
                        <NavDropdown.Item href="appliances">Appliances repair</NavDropdown.Item>
                    </NavDropdown>

                    <li className="nav-item">
                        <Link to="orders" className="nav-link">Orders</Link>
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
