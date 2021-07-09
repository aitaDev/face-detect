import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import brain from "./brain.png";

export default function Logo() {
  return (
    <div className="center ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 250, width: 250 }}
      >
        <div className="Tilt-inner pa5">
          <img style={{ paddingTop: "5px" }} src={brain} alt="logo" />
        </div>
      </Tilt>
    </div>
  );
}
