import React from "react";
import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../Toolbar/NavigationItems/NavigationItems";
import "./SideDrawer.css";

function SideDrawer(props) {
     
  return (
    <div>
      <Backdrop 
      show={props.show}
      Clicked={props.closed}
      />
      <div className={`SideDrawer ${props.show ? 'open' : 'close'}`}>
        <div className="logo-drawer">
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </div>
  );
}

export default SideDrawer;
