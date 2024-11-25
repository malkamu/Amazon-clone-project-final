import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import LayOut from "../../Component/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../API/endPoints";
import ProductCard from "../../Component/Product/ProductCard";
import Loader from "../../Component/Loader/Loader";
const Results = () => {
  const { categoryName } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, SetIsLoading] = useState(false);

  useEffect(() => {
    SetIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        SetIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetIsLoading(false);
      });
  }, []);
  console.log(results);

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <section>
          <h1 style={{ padding: "30px" }}>Results</h1>
          <p style={{ padding: "30px" }}>Category / {categoryName}</p>
          <hr />
          <div className={classes.product_container}>
            {results?.map((product) => {
              // console.log(product);
              return <ProductCard key={product.id} product={product} renderAdd={true} />;
            })}
          </div>
        </section>
      )}
    </LayOut>
  );
};

export default Results;
