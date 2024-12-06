import React, { useContext, useState } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../Component/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import { ClipLoader } from "react-spinners";

function SignUp() {
  const navStateData = useLocation();
  const [{ user }, dispatch] = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  // console.log(user);
  // console.log(error);
  const authHandler = async (e) => {
    e.preventDefault();
    const { name } = e.target;

    if (name === "signin") {
      setLoading({ ...loading, signin: true });

      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signin: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    } else if (name === "signup") {
      setLoading({ ...loading, signup: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signup: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signup: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt=""
        />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign-in</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>
          <button
            onClick={authHandler}
            name="signin"
            type="submit"
            className={classes.login_signInButton}
          >
            {loading.signin ? <ClipLoader size={15} /> : "Sign In"}
          </button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/* create account button  */}
        <button
          onClick={authHandler}
          name="signup"
          type="button"
          className={classes.login_registerButton}
        >
          {loading.signup ? (
            <ClipLoader size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default SignUp;

// import { sendPasswordResetEmail } from 'firebase/auth';

// // Inside your component:
// const resetPassword = async () => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//     setError('Password reset email sent! Check your inbox.');
//   } catch (err) {
//     setError('Failed to send reset email: ' + err.message);
//   }
// };

// // Add this link to your JSX:
// <button onClick={resetPassword}>Forgot Password?</button>
