import React, { useContext, useState, useEffect } from "react";
import LayOut from "../../Component/LayOut/LayOut";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import CurrencyFormat from "../../Component/CurrencyFormatter/CurrencyFormatter";
import classes from "./Payment.module.css";
import ProductCard from "../../Component/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../API/axios";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";

import { Type } from "../../Utility/action.type";

const Payment = () => {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const [amount, setAmount] = useState(0);
  let total = 0;
  useEffect(() => {
    const totalAmount = basket.reduce((total, item) => total + item.price, 0);
    setAmount(totalAmount);
  }, [basket]);

  const handleChange = (e) => {
    e?.error?.message ? setError(e?.error?.message) : setError("");
  };
  const stripe = useStripe();
  const elements = useElements();

  // Pay submit button
  const paymentSubmit = async (e) => {
    e.preventDefault(); //block the refresh form

    try {
      setIsProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${amount * 100}`,
      });
      console.log(response.data);
      const clientScrete = response.data?.clientScerete;
      // console.log(clientScrete);
      if (!clientScrete) throw new Error("Payment intent creation failed");

      const { paymentIntent } = await stripe.confirmCardPayment(clientScrete, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      // await db
      //   .collection("users")
      //   .doc(user.uid)
      //   .collection("orders")
      //   .doc(paymentIntent.id)
      //   .set({
      //     basket: basket,
      //     amount: paymentIntent.amount,
      //     created: paymentIntent.created,
      //   });
      // empty the basket
      dispatch({
        type: Type.EMPTY_BASKET,
        item: null,
      });
      setIsProcessing(false);
      navigate("/successorders");
    } catch (err) {
      console.log(err);
      setIsProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>
        Total Items Checkout ({totalItem})
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react Lane</div>
            <div>Ethiopia, IL</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>

        <div className={classes.flex}>
          <h3>Payments method</h3>
          <div className={classes.payment__card_container}>
            <div className={classes.payment_details}>
              <form action="" onSubmit={paymentSubmit}>
                {error && <small style={{ color: "red" }}>{error}</small>}
                <CardElement onChange={handleChange} />
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Orders | </p>
                      <CurrencyFormat amount={amount} />
                    </span>
                  </div>
                  <button type="submit">
                    {isProcessing ? (
                      <ClipLoader color="#36d7b7" size={15} />
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
};

export default Payment;
