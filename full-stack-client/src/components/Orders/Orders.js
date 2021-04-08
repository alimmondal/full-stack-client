import React, { useContext } from "react";
import { UserContext } from "../../App";
import "./Orders.css";

const Orders = () => {
  const [loggedInUser, setLoggedInUser, cart, setCart] = useContext(
    UserContext
  );
  console.log(loggedInUser, cart);

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
  }

  return (
    <div className="container">
      <div>
        <h1>Users Details:</h1>
        <h6>Name: {loggedInUser.name}</h6>
        <h6>Email: {loggedInUser.email}</h6>
      </div>
        <div>
        <h3>Order Detail:</h3>
          {
              cart.map((pd) => <li>Name: {pd.name} --- Price: ${pd.price} -- Date: --</li>)
          }
        </div>
    </div>
  );
};

export default Orders;
