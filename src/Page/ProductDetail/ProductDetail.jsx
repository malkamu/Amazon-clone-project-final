import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/endPoints";
import LayOut from "../../Component/LayOut/LayOut";
import ProductCard from "../../Component/Product/ProductCard";
import Loader from "../../Component/Loader/Loader";
function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, SetIsLoading] = useState(false);
  useEffect(() => {
    SetIsLoading(true);
    axios
      .get(`${productUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        SetIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetIsLoading(false);
      });
  }, []);
  console.log(product);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard product={product} flex={true} renderDesc={true} renderAdd={true} />
      )}
    </LayOut>
  );
}

export default ProductDetail;
