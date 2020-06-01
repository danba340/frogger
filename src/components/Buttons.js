import React, { useEffect } from "react";
import { atom, useRecoilState } from "recoil";

function Buttons() {
  const frogState = atom({
    key: "frogState",
    default: { x: 4, y: 8, dir: "up" },
  });
  const [frog, setFrog] = useRecoilState(frogState);
  const inputBlockedState = atom({
    key: "inputBlockedState",
    default: false,
  });
  const [inputBlocked, setInputBlocked] = useRecoilState(inputBlockedState);

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  });
  // TODO
  const gameOver = false;

  const keyPressHandler = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (inputBlocked) {
      return;
    }
    setInputBlocked(true);
    setTimeout(() => {
      setInputBlocked(false);
    }, 250);
    if (!gameOver) {
      if (e.keyCode === 37) {
        // left
        setFrog({
          x: frog.x > 0 ? frog.x - 1 : 0,
          y: frog.y,
          dir: "left",
        });
      } else if (e.keyCode === 39) {
        // right
        setFrog({
          x: frog.x < 8 ? frog.x + 1 : 8,
          y: frog.y,
          dir: "right",
        });
      } else if (e.keyCode === 38) {
        // up
        setFrog({
          x: frog.x,
          y: frog.y > 0 ? frog.y - 1 : 0,
          dir: "up",
        });
      } else if (e.keyCode === 40) {
        // down
        setFrog({
          x: frog.x,
          y: frog.y < 8 ? frog.y + 1 : 8,
          dir: "down",
        });
      }
    }
  };
  return (
    <div className="buttons">
      <div
        onClick={() => {
          keyPressHandler({ keyCode: 38 });
        }}
        className="button"
      >
        UP
      </div>
      <div>
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 37 });
          }}
          className="button"
        >
          LEFT
        </div>
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 39 });
          }}
          className="button"
        >
          RIGHT
        </div>
      </div>
      <div
        onClick={() => {
          keyPressHandler({ keyCode: 40 });
        }}
        className="button"
      >
        DOWN
      </div>
    </div>
  );
}

export default Buttons;
