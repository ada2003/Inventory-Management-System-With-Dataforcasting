 // Sidebar.js


import './Sidebar.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { FaChartBar, FaPlus, FaList, FaChartPie, FaPhone } from 'react-icons/fa'; // Import icons from react-icons library

function Sidebar() {
  
  return (
    <div className="sidebar">
      <div className="user-info">
       <h2>Inventory tracker</h2>      
       </div>
       <ul className="sidebar-menu">
       <li><FaChartBar style={{ color: '#FF5733' }} /><Link to="/dashboard">Dashboard</Link></li>
       <li><FaPlus style={{ color: '#FFD700' }} /><Link to="/add-product">Add Product</Link></li>
       <li><FaList style={{ color: '#008000' }} /><Link to="/product-list">Product list</Link></li>
       <li><FaChartPie style={{ color: '#0000FF' }} /><Link to="/Data-forcating">Data Forecasting</Link></li>
       <li><FaPhone style={{ color: '#800080' }} /><Link to="/Contact-Us">Contact Us</Link></li>
     </ul>
    </div>
  );
}

export default Sidebar;