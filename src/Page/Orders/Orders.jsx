import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Component/LayOut/LayOut";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import classes from "./Orders.module.css";
import { Link } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ user }] = useContext(DataContext);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc, i) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your orders</h2>
          <div>
            {orders?.length === 0 && (
              <div style={{ padding: "20px" }}>
                You don't have orders yet. Do you want to order more?
                <Link to="/" style={{ textDecoration: "none", color: "green" }}>
                  Click Here
                </Link>
              </div>
            )}
          </div>
          {/* ordered items in the database */}
          <div>
            {orders?.map((eachOrder, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
              
      </section>
    </LayOut>
  );
};

export default Orders;
