import React from "react";
import { CubeIcon } from "@heroicons/react/solid";
import Head from "next/head";
import classes from "../styles/Login.module.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  }

  return (
    <div className={classes.container}>
      <Head>
        <title>Login</title>
      </Head>
      <div className={classes.dropBackground}>
        <CubeIcon className={classes.icon} />
        <div className={classes.LoginContainer} onClick={signIn}>
          <img src="https://ssl.gstatic.com/images/branding/googleg/2x/googleg_standard_color_64dp.png" />
          <h3>SIGN IN WITH GOOGLE</h3>
        </div>
      </div>
    </div>
  );
}

export default Login;
