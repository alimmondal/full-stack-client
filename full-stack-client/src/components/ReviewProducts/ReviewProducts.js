import React, { useContext } from "react";
import { UserContext } from "../../App";
import "./ReviewProducts.css";

const ReviewProducts= () => {
  const [loggedInUser, setLoggedInUser, cart, setCart] = useContext(
    UserContext
  );
  console.log(loggedInUser, cart);


  return (
    <div className="container">
      
     
     
        <div>
        <h3>Review Your Products:</h3>
          {
              cart.map((pd) => <li><strong>Name:</strong> {pd.name} --- <strong>Price: </strong> ${pd.price} -- Date: --<button>delete</button></li>)
          }
        </div>
        
      
    </div>
  );
};

export default ReviewProducts;
