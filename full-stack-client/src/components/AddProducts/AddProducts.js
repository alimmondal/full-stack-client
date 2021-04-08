import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddProducts = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [imageURL, setImageURL] = useState(null);

  const onSubmit = (data) => {
    const productData = {
      name: data.name,
      price: data.price,
      imageURL: imageURL,
    };
    const url = `http://localhost:5055/addProduct`;
    console.log(productData);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => console.log("server side response", res));
  };

  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "bc49d8a4e8fcfa0955507231e6a73408");
    imageData.append("image", event.target.files[0]);

    axios.post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container" style={{display:'flex', justifyContent: 'center'}}>
      <div style={{marginRight:'100px', backgroundColor:'purple', padding:'20px'}}>
        <ul style={{color:'white'}}>
          <h3>Fresh Valley</h3>
          <li>Add Product</li>
          <li>Manage Product</li>
        </ul>
      </div>
      <div>
        <h1> Add products here</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Product name</p>
          <input
            name="name"
            defaultValue="New exciting product"
            {...register("name")}
          />
          <br />
          <br />
          <p>Price</p>
          <input name="price" type="number" defaultValue="price" {...register("price")} />
          <br />
          <br />
          <p>Photo:</p>
          <input type="file" onChange={handleImageUpload} />
          <br />
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
