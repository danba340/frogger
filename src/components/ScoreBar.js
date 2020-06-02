import React from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import FrogIcon from "./FrogIcon";
import CrownIcon from "./CrownIcon";

function ScoreBar() {
  const [frog, setFrog] = useRecoilState(
    atom({ key: "frogState", default: {} })
  );
  const score = useRecoilValue(atom({ key: "scoreState" }));
  const highScore = useRecoilValue(atom({ key: "highScoreState" }));
  const setGameOver = useSetRecoilState(atom({ key: "gameOverState" }));
  console.log(score, highScore);
  return (
    <div className="score-bar">
      <div className="score-wrapper">
        {frog && frog.dead ? (
          <div
            className="button"
            onClick={() => {
              setGameOver(false);
              setFrog({ x: 4, y: 8, dir: "up", dead: false });
            }}
          >
            RESTART
          </div>
        ) : (
          <>
            <FrogIcon />
            <span className="score">{score ? score : 0}</span>
            <CrownIcon />
            <span className="high-score">{highScore ? highScore : 0}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ScoreBar;
