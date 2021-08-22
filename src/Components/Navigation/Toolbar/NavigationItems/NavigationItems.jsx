import "./NavigationItems.css";
import { NavLink } from "react-router-dom";



function NavigationItems() {
  return (
    <div>
      <ul className="NavigationItems">
        <li>
          <NavLink to="/">Burger Builder</NavLink>
        </li>
        <li>
          <NavLink to="/order">Checkout</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavigationItems;
