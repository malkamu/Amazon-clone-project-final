import React from "react";
import LayOut from "../../Component/LayOut/LayOut";
import classes from "./Orders.module.css";
import { Link } from "react-router-dom";
function SucessOrder() {
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2 style={{ color: "green" }}>
            Your orders are succesfully sent. Thank you for your bussiness with
            us!
          </h2>
          <div>
            <div style={{ padding: "20px" }}>
              Do you want to Order More?
              <Link to="/" style={{ textDecoration: "none", color: "green" }}>
                Click Here
              </Link>
            </div>
          </div>
        </div>
              
      </section>
    </LayOut>
  );
}

export default SucessOrder;
