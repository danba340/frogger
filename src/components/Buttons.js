import React from "react";

function Buttons({ onPress }) {
  return (
    <div className="buttons">
      <div
        onClick={() => {
          onPress({ keyCode: 38 });
        }}
        className="button"
      >
        UP
      </div>
      <div>
        <div
          onClick={() => {
            onPress({ keyCode: 37 });
          }}
          className="button"
        >
          LEFT
        </div>
        <div
          onClick={() => {
            onPress({ keyCode: 39 });
          }}
          className="button"
        >
          RIGHT
        </div>
      </div>
      <div
        onClick={() => {
          onPress({ keyCode: 40 });
        }}
        className="button"
      >
        DOWN
      </div>
    </div>
  );
}

export default Buttons;
