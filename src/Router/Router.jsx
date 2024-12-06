import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../Page/Landing/Landing";
import SignUp from "../Page/Auth/SignUp";
import Payment from "../Page/Payment/Payment";
import Orders from "../Page/Orders/Orders";
import Cart from "../Page/Cart/Cart";
import Results from "../Page/Results/Results";
import ProductDetail from "../Page/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SucessOrder from "../Page/Orders/SucessOrder";

const stripePromise = loadStripe(
  "pk_test_51QQGUjHTmZds9IuLE2NS2vuMBLb6yiBBazOqUTJB8oStpkvwRsPKFUfGJOzVb6aGGwak5ZmYjS4NJmqJAT1Ginx400No5lA2ts"
);

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<SignUp />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              msg={"you have to login to pay"}
              redirect={"/payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/successorders" element={<SucessOrder />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you have to login to access order"}
              redirect={"/orders"}
            >
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productID" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
