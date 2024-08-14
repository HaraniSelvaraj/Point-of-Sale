import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Navbar from './Component/Navbar.js';
import LandingPage from './Component/LandingPage.js';
import Contactus from './Component/Contactus.js';
import InventoryManagement from './Component/InventoryManagement.js';
import SalesReporting from './Component/SalesReporting.js';
import CustomerManagement from './Component/CustomerManagement.js';
import PaymentProcessing from './Component/PaymentProcessing.js';
import Dashboard from './Component/DashboardPanel.js';
import Carousel from './Component/Carousel.js';
import ItemPage from './Component/ItemPage.js';
import ProfilePage from './Component/ProfilePage.js';
import BillingPage from './Component/BillingPage.js';
import SuccessPage from './Component/SuccessPage.js';
import AdminLogin from './Component/AdminLogin.js';
import Home from './Component/Home.js';
import UserNav from './Component/UserNav.js';
import About from './Component/About.js';
import Customeradmin from './Component/Customeradmin.js';
import Navbar1 from './Component/Navbar1.js';
import Home1 from './Component/Home1.js';
import Cart from './Component/Cart.js';

const App = () => {
  
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/"element={<Home1/>}/>
          <Route path="/Navbar1" element={<Navbar1/>}/>
        <Route path="/AdminLogin" element={<AdminLogin/>}/>
        <Route path="/Customeradmin" element={<Customeradmin/>}/>
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/UserNav" element={<UserNav/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path='/LandingPage' element={<LandingPage />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/InventoryManagement" element={<InventoryManagement />} />
          <Route path="/SalesReporting" element={<SalesReporting />} />
          <Route path="/CustomerManagement" element={<CustomerManagement />} />
          <Route path="/PaymentProcessing" element={<PaymentProcessing />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path='/Carousel' element={<Carousel />} />
          <Route path="/ItemPage" element={<ItemPage/>}/>
          <Route path="/Admin" element={<Login/>}/>
          <Route path="/User" element={<Login/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/Billing" element={<BillingPage/>}/>
          <Route path="/SuccessPage" element={<SuccessPage/>}/>
          <Route path="/Home" element={<Home/>}/> 
          <Route path="/Cart" element={<Cart/>}/>

        </Routes>
      </div>
    </Router>
  );
};

export default App;
