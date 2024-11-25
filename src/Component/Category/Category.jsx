import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryImage } from "./CategoryFullInfo";
import classes from "./Category.module.css";

const Category = () => {
  return (
    <section className={classes.category_container}>
      {categoryImage.map((info, i) => {
        return <CategoryCard key={i} data={info} />;
      })}
    </section>
  );
};

export default Category;
