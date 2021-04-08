import React from "react";
import "./Products.css";

const Products = (props) => {
  const {imageURL, price, name, _id} = props.product;

  return (
    <div className="productStyle">
      <img style={{ height: "300px" }} src={imageURL} alt="" />
      <h5>{name}</h5>
      <div className="btnPrice">
        <h6>Price: ${price}</h6>
        <button
          className="btn-primary"
          onClick={() => props.handleAddProduct(props.product, _id)}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Products;
