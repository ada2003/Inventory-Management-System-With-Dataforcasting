import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Routes/Dashboard';
import AddProduct from './components/Routes/AddProduct';
import ProductList from './components/Routes/ProductList';
import Account from './components/Routes/Account';
import ReportBug from './components/Routes/ReportBug';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
    <Routes>
    <Route index element={<Dashboard/>} />
    <Route path="add_product" element={<AddProduct/>} />
    <Route path="product_list" element={<ProductList/>} />
    <Route path="account" element={<Account/>} />
    <Route path="report_bug" element={<ReportBug/>} />
    </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;
