import "./NavigationItems.css";
import { NavLink } from "react-router-dom";



function NavigationItems() {
  return (
    <div>
      <ul className="NavigationItems">
        <li>
          <NavLink exact to="/">Burger Builder</NavLink>
        </li>
        <li>
          <NavLink  to="/orders">Orders</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavigationItems;
