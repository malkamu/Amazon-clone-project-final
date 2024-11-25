import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "./Product.module.css";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
const Product = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);
  useEffect(() => {
    SetIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        SetIsLoading(false);
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        SetIsLoading(false);
        console.log(err);
      });
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product_container}>
          {product?.map((singleProduct, index) => {
            return <ProductCard product={singleProduct} key={index} renderAdd={true} />;
          })}
        </section>
      )}
    </>
  );
};

export default Product;
