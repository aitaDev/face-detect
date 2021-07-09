import React from "react";
import "./imagelinkform.css";

export default function ImageLinkForm({ onInputChange, onSubmit }) {
  return (
    <div className="ma4 mt0">
      <p className="f3">
        This magic brain will detect faces in your pictures, Give it a try!
      </p>
      <div className="center">
        <div className="center form pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            onChange={onInputChange}
            placeholder="Enter Image URL..."
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
