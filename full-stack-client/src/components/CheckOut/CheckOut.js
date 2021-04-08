// import { Link, useParams } from 'react-router-dom';
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./CheckOut.css";

const CheckOut = () => {
  const [loggedInUser, setLoggedInUser, cart, setCart] = useContext(
    UserContext
  );

  // const total = cart.reduce((total, prd) => total * prd.price, 0);
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price;
  }

  const name = cart.map((pd) => <li>{pd.name}</li>);
  const price = cart.map((pd) => <li>{pd.price}</li>);

//   const grandTotal = (total + price + Number(total).toFixed(2));

  return (
    <div className=" container">
      <h3>CheckOut</h3>
      <div className="orderDetail">
        <ul style={{ display: "flex" }}>
          <li>Name: {name} </li>
          <li>Items Ordered: {cart.length}</li>
          <li>Price: {price}</li>
        </ul>
      </div>
      <div className="totalDiv">
        
        <h6>Total Price</h6>
        <p>={total}</p>
       
      </div>
      <div className="reviewBtn">
        <Link to="/ReviewProducts">
        <button className="btn-warning rounded">
            Review Out Your Order
          </button>
        </Link>
      </div>
      
      <br />
      <br />
    </div>
  );
};

export default CheckOut;
