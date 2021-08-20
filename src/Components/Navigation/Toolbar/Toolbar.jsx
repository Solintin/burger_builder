import Logo from "../../Logo/Logo";
import NavigationItems from "./NavigationItems/NavigationItems";
import "./Toolbar.css";

function Toolbar(props) {
  return (
    <div>
      <header className="toolbar">
        <div className="menu" onClick={props.sideBarHandler}>
          <i className="fas fa-bars fa-2x"></i>
        </div>

        <div className="Logo">
          <Logo />
        </div>
        <nav className="deskstop-only">
          <NavigationItems />
        </nav>
      </header>
    </div>
  );
}

export default Toolbar;
