import React from "react";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

export default function Modal(props) {
  return (
    <div>
      <Backdrop show={props.show} Clicked={props.Clicked} />

      <div className={`Modal ${props.show ? "show" : "hide"}`}>
        {props.children}
      </div>
    </div>
  );
}
