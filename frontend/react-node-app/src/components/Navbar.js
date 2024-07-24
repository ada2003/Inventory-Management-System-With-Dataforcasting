import { Link } from "react-router-dom";
import profileImage from "./images/profileImage.jpg";

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="items">
        <li>
          <img src={profileImage} /> <span>My name</span>
        </li>
        <li>
          <span>
            <Link to="/">Dashboard</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="/product_list">Product List</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="add_product">Add product</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="account">Account</Link>
          </span>
        </li>
        <li>
          <span>
            <Link to="report_bug">Report bug</Link>
          </span>
        </li>
      </ul>
    </nav>
  );
}
