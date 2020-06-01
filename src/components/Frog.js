import React from "react";
import { atom, useRecoilValue } from "recoil";
import { frogDead, frogNE, frogNW, frogSE, frogSW } from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function Frog() {
  const frogState = atom({
    key: "frogState",
    default: { x: 4, y: 8, dir: "up", dead: false },
  });
  const frog = useRecoilValue(frogState);

  // Get corrrect image from direction
  let src;
  if (frog.dead) {
    src = frogDead;
  } else if (frog.dir === "up") {
    src = frogNE;
  } else if (frog.dir === "down") {
    src = frogSW;
  } else if (frog.dir === "left") {
    src = frogNW;
  } else if (frog.dir === "right") {
    src = frogSE;
  }

  // Calc abs position
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * frog.y + yOffset / 1.8;
  const xBase = 50 - (100 / 18) * frog.y;
  const xAbs = xBase + (50 / 9) * frog.x;
  const yAbs = yBase + yOffset * frog.x;

  return (
    <img
      alt="frog"
      className={`frog ${frog.dead && "dead"}`}
      style={{ top: `${yAbs}%`, left: `${xAbs}%` }}
      src={src}
    />
  );
}

export default Frog;
