import React, { useRef, useState } from "react";
import classes from "./NewProductForm.module.scss";

const NewProductForm = (props) => {
  const [image, setImage] = useState("");
  const titleRef = useRef();
  const priceRef = useRef();
  const typeRef = useRef();

  const convertToBase64 = (event) => {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      type: typeRef.current.value,
      image: image,
    };
    props.onAddProduct(formData);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="price">Price</label>

          <input type="number" required id="price" ref={priceRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="type">Product Type</label>
          <select required id="type" ref={typeRef}>
            {props.productTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Image</label>

          <input
            type="file"
            required
            id="title"
            accept=".jpg, .png, .jpeg"
            onChange={convertToBase64}
          />
          {image === "" || image === null ? (
            ""
          ) : (
            <img width={100} height={100} src={image} />
          )}
        </div>
        <div className={classes.actions}>
          <button>Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default NewProductForm;
