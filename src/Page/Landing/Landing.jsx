import React from "react";
import Carsouel from "../../Component/Carsouel/Carsouel";
import Category from "../../Component/Category/Category";
import Product from "../../Component/Product/Product";
import LayOut from "../../Component/LayOut/LayOut";
const Landing = () => {
  return (
    <>
        <LayOut>
        <Carsouel />
        <Category />
        <Product />
      </LayOut>
    </>
  );
};

export default Landing;
