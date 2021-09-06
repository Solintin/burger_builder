import "./Order.css";

const OrderedBurger = (props) => {
  const { price, ingredient } = props;

  const orderedIngredient = [];
  for (let ingredientName in ingredient) {
    orderedIngredient.push({
      name: ingredientName,
      amount: ingredient[ingredientName],
    });
  }
  const orderList = orderedIngredient.map((order) => (
    <li key={order.name}>
      {order.name} - {order.amount}
    </li>
  ));
  return (
    <div>
      <div className="order">
        <span>Ingredients :{orderList}</span>
        <p>
          Price : <strong>{price.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};

export default OrderedBurger;
