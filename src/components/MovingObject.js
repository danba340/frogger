import React from "react";
import { boatUp, boatDown, truckUp, truckDown } from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";

function MovingObject({ x, y, type, direction }) {
  const yOffset = ((100 / WORLD_SIZE) * TILE_ASPECT_RATIO) / 1.8;
  const yBase = yOffset * y + yOffset / 1.5;
  const xBase = 50 - (100 / 19) * y;
  const xAbs = xBase + (50 / 9) * x;
  const yAbs = yBase + yOffset * x;
  let src;
  if (type === "boat" && direction === "up") {
    src = boatUp;
  } else if (type === "boat" && direction === "down") {
    src = boatDown;
  } else if (type === "truck" && direction === "up") {
    src = truckUp;
  } else if (type === "truck" && direction === "down") {
    src = truckDown;
  }
  return (
    <img
      className={`${type}`}
      style={{
        top: `${yAbs}%`,
        left: `${xAbs}%`,
        opacity: x < 0 || x > 8 ? 0 : 1,
      }}
      src={src}
    />
  );
}

export default MovingObject;
