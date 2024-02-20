import { useSelector  } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { Navbar } from 'react-bootstrap';
import { useEffect } from "react";

export default function CustomerHome() {
    const user = useSelector(state => state.logged.user); 
    console.log(user)
    //const mystate = useSelector(state => state.logged);
    
    useEffect(()=> {
        const userid =user.user_id;
        console.log(userid)
        fetch("http://localhost:8080/getCustomer?userid="+userid)
        .then(resp => {
            console.log(resp.status)
            if(resp.ok)
                return resp.json();
            else
                throw new Error("server error")
        })
        .then(obj => localStorage.setItem("loggedCustomer",JSON.stringify(obj)))
        .catch(error => console.log(error.toString()))
    },[])

    const mystate = useSelector(state => state.logged)

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
