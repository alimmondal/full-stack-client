import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { UserContext } from "../../App";
import Products from "../Products/Products";

const Home = () => {
    const [loggedInUser, setLoggedInUser, cart, setCart] = useContext(UserContext);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5055/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const history = useHistory();
  const handleAddProduct = (product, _id) => {
    history.push(`/CheckOut/${_id}`);
    console.log("product added", product);
    const newCart = [...cart, product];
    setCart(newCart);
    // console.log(newCart);
  };

  return (
    
      <div class="container"
      style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
      {products.map((product) => (
        <Products
          handleAddProduct={handleAddProduct}
          product={product}
        ></Products>
      ))}
      
      
    </div>
  );
};

export default Home;
