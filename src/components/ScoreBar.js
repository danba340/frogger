import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import useLocalStorage from "../hooks/useLocalStorage";
import FrogIcon from "./FrogIcon";
import CrownIcon from "./CrownIcon";

function ScoreBar() {
  const [frog, setFrog] = useRecoilState(
    atom({ key: "frogState", default: {} })
  );
  const score = useRecoilValue(atom({ key: "scoreState" }));
  const [highScore] = useLocalStorage("highScore");
  const setGameOver = useSetRecoilState(atom({ key: "gameOverState" }));

  return (
    <div className="score-bar">
      <FrogIcon />
      <span className="score">{score || 0}</span>
      <CrownIcon />
      <span className="high-score">{highScore || 0}</span>
      {frog && frog.dead && (
        <button
          onClick={() => {
            setGameOver(false);
            setFrog({ x: 4, y: 8, dir: "up", dead: false });
          }}
        >
          Restart
        </button>
      )}
    </div>
  );
}

export default ScoreBar;
