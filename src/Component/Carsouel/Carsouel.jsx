import React from "react";
import classes from "./Carsouel.module.css";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel";
const Carsouel = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem, i) => {
          return <img src={imageItem} alt="carousel" key={i} />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
        </div>
  );
};

export default Carsouel;
