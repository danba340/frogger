import React, { useEffect, useCallback, useRef } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import ArrowsIcon from "./ArrowsIcon";

function Inputs() {
  const frogState = atom({
    key: "frogState",
    default: { x: 4, y: 8, dir: "up" },
  });
  const [frog, setFrog] = useRecoilState(frogState);
  const allowInputState = atom({
    key: "allowInputState",
    default: true,
  });
  const gameOver = useRecoilValue(atom({ key: "gameOverState" }));
  const [allowInput, setAllowInput] = useRecoilState(allowInputState);

  let timer = useRef(false);
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, [timer]);

  const keyPressHandler = useCallback(
    (e) => {
      console.log("keypress");
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (gameOver) {
        return;
      }
      if (!allowInput) {
        return;
      }
      setAllowInput(false);
      timer.current = setTimeout(() => {
        setAllowInput(true);
      }, 350);
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
          y: frog.y > -1 ? frog.y - 1 : 0,
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
    },
    [frog, setFrog, gameOver, allowInput, setAllowInput]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setInputBlocked(false);
  //   }, 250);
  //   return () => {
  //     setInputBlocked(false);
  //     clearInterval(timer);
  //   };
  // }, [inputBlockedState, setInputBlocked]);

  return (
    <div className="buttons w-100">
      <div className="arrows">
        <ArrowsIcon />
      </div>
      <div className="flex justify-between">
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
            keyPressHandler({ keyCode: 38 });
          }}
          className="button"
        >
          UP
        </div>
      </div>
      <div className="flex justify-between">
        <div
          onClick={() => {
            keyPressHandler({ keyCode: 40 });
          }}
          className="button"
        >
          DOWN
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
    </div>
  );
}

export default Inputs;
