import React from "react";
import classes from "../css/DefaultPage.module.css";
import { CubeIcon } from "@heroicons/react/solid";

function DefaultPage() {
  return (
    <div className={classes.centerBlock}>
      <div className={classes.container}>
        <CubeIcon className={classes.icon} />
        <h3>CUBE CHAT</h3>
      </div>
    </div>
  );
}

export default DefaultPage;
