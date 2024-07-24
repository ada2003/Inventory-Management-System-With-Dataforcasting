import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage'; // Import the LoginPage component
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Dashbord from './pages/Dashbord';
import Addproduct from './pages/Addproduct';
import Productlist from './pages/Productlist';
import Dataforcasting from './pages/Dataforcasting';
import ContactPage from './pages/ContactPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/add-product' element={<Addproduct />} />
          <Route path='/product-list' element={<Productlist />} />
          <Route path='/Data-forcating' element={<Dataforcasting />} />
          <Route path='/Contact-Us' element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
