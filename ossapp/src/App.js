// import logo from './logo.svg';
import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Logout from './components/Logout';
import { useSelector } from 'react-redux';
import VendorHome from './components/VendorHome';
import CustomerHome from './components/CustomerHome';
import AdminHome from './components/AdminHome';
//import VendorSignUp from './components/VendorSignUp';
//import CustomerSignUp from './components/CustomerSignUp';

function App() {
  const mystate = useSelector(state => state.logged);
  return (
    <div>
      <div style={{ display: mystate.loggedIn ? "none" : "block" }}>
        <h1 style={{ marginLeft: 540 }}>OneStop Services</h1>
        <nav className="navbar navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
          <ul className="nav navbar">
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                  <Link to="/register" className="nav-link">Registration</Link>
            </li>
            {/*<li className="nav-item">
              <Link to="/vendorreg" className="nav-link">Vendor Registration</Link>
            </li>

            <li className="nav-item">
              <Link to="/customerreg" className="nav-link">Customer Registration</Link>
            </li>*/}
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={ <Registration/>} />
        {/*<Route path="/vendorreg" element={<VendorSignUp />} />
        <Route path="/customerreg" element={<CustomerSignUp />} />*/}
        <Route path="/customerhome" element={<CustomerHome />} >
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/vendorhome" element={<VendorHome />} >
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/adminhome" element={<AdminHome />} >
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
