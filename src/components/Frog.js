import React from "react";
import { frogNE, frogNW, frogSE, frogSW } from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function Frog({ x, y, direction }) {
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.8;
  const xBase = 50 - (100 / 18) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;
  let src;
  if (direction === "up") {
    src = frogNE;
  } else if (direction === "down") {
    src = frogSW;
  } else if (direction === "left") {
    src = frogNW;
  } else if (direction === "right") {
    src = frogSE;
  }

  return (
    <img
      className="frog"
      style={{ top: `${yAbs}%`, left: `${xAbs}%` }}
      src={src}
    />
  );
}

export default Frog;
