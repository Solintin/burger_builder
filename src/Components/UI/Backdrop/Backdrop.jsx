import './Backdrop.css'

function Backdrop(props) {
  if (props.show) {
    return <div className="Backdrop" onClick={props.Clicked}  ></div>;
  }else {
      return null;
  }
}

export default Backdrop;  
