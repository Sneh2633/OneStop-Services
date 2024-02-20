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
import ApproveVendor from './components/ApproveVendor';
import AddService from './components/AddService';
import SearchVendor from './components/SearchVendor';
import OredersHistory from './components/OredersHistory';
import CustomerRequest from './components/CustomerRequest';
import UpdateService from './components/UpdateService';
import VendorFeedback from './components/VendorFeedback';
import AddCategory from './components/AddCategory';
import ServiceCost from './components/ServiceCost';

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
          </ul>
        </nav>
      </div>

      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/customerhome" element={<CustomerHome />} >
          <Route path="logout" element={<Logout />} />
          <Route path="/customerhome/searchvendors" element={<SearchVendor />} />
          <Route path="ordershistory" element={<OredersHistory />} />
          <Route path="/customerhome/searchvendors/VendorFeedback" element={<VendorFeedback />} />
          <Route path="/customerhome/searchvendors/ServiceCost" element={<ServiceCost />} />
          <Route path="/customerhome/searchvendors/VendorFeedback/:vendorId" element={<VendorFeedback />} />

        </Route>
       

        <Route path="/vendorhome" element={<VendorHome />} >
          <Route path="customerrequests" element={<CustomerRequest />} />
          <Route path="updateservices" element={<UpdateService />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route path="/adminhome" element={<AdminHome />} >
          <Route path="logout" element={<Logout />} />
          <Route path="addcategory" element={<AddCategory />} />
          <Route path="addservice" element={<AddService />} />
          <Route path="approvevendor" element={<ApproveVendor />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
