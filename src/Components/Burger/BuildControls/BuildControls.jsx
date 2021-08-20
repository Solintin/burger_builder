import "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className="BuildControls">
    <p>
      Current Price : <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map((control) => {
      return (
        <BuildControl
          key={control.label}
          label={control.label}
          handleAddIngredient={() => props.handleAddIngredient(control.type)}
          handleRemoveIngredient={() =>
            props.handleRemoveIngredient(control.type)
          }
          disabled={props.disabled[control.type]}
        />
      );
    })}
    <button className='OrderButton' disabled={props.purchaseState} onClick={props.purchaseHandler}>ORDER NOW</button>
  </div>
);

export default BuildControls;
