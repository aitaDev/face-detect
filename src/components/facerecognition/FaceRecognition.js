import React from "react";
import "./FaceRecognition.css";

export default function FaceRecognition({ imgUrl, box, name }) {
  return (
    <>
      <div className="f3 white">{name.toUpperCase()}</div>
      <div className="center ma">
        <div className="absolute mt2">
          <img
            id="inputImage"
            className="br3"
            src={imgUrl}
            alt="face submission"
            width="500px"
            height="auto"
          />
          <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
