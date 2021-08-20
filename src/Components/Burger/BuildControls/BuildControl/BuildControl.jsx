import "./BuildControl.css";

const BuildControl = (props) => {
  return (
    <div className="BuildControl">
      <div className="Label"> {props.label} </div>
      <button className="Less" onClick={props.handleRemoveIngredient} disabled={props.disabled}> Less </button>
      <button className="More" onClick={props.handleAddIngredient} > More </button>
    </div>
  );
};

export default BuildControl;
