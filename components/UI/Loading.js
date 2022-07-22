import { CubeIcon } from "@heroicons/react/solid";
import React from "react";
import classes from '../css/Loading.module.css';

function Loading() {
  return (
    <div className={classes.gridContainer}>
          <CubeIcon className={classes.spinner}/>
    </div>
  );
}

export default Loading;
