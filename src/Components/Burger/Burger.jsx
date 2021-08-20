import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  const transformIngredientKey = Object.keys(props.ingredients); // Get Ingredients from ingredients objects
  const transformIngredientVal = Object.values(props.ingredients); // Get no of Ingredients from ingredients objects

  let ingredientContainer = []; // empty array to store picked burger ingredients

  transformIngredientKey.map((key, idk) => {
    // eslint-disable-next-line
    return transformIngredientVal.map((val, idv) => {
      if (idk === idv) {
        for (let i = 1; i <= val; i++) {
          let rand = Math.random(); //Provide a random Key
          ingredientContainer.push(
            <BurgerIngredient type={key} key={key + rand} />
          ); //feed in burger ingredient array
        }
      }
    });
  });

  const ingredientList = ingredientContainer.map(val => {
    return val;
  });

  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top" />

      {ingredientContainer.length === 0 ? (
        <h3>Please Order Burger Ingredients </h3>
      ) : (
        ingredientList
      )}

      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default Burger;
