import "./NavigationItems.css";

const activeLink = {
    checkout : false,
    burgerBuilder : true
}

function NavigationItems() {
    
  return (
    <div>
      <ul className="NavigationItems">
        <li>
          <a href="/" className={`${activeLink.burgerBuilder ? "active" : null}`}>
            Burger Builder
          </a>
        </li>
        <li>
          <a href="/" className={`${activeLink.checkout ? "active" : null}`}>
            Checkout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default NavigationItems;
