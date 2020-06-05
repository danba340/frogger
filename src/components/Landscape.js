import React from "react";
import {
  road,
  grass,
  water,
  roadGrassAbove,
  roadGrassBelow,
  waterGrassAbove,
  waterGrassBelow,
} from "../images";
import { WORLD_SIZE, TILE_ASPECT_RATIO } from "../constants";
import Tile from "./Tile";

function Landscape() {
  const tiles = [];
  for (let i = WORLD_SIZE; i > 0; i--) {
    if (i === 1 || i === 6 || i === 9) {
      tiles.push(Array(WORLD_SIZE).fill("grass"));
    } else if (i === 2) {
      tiles.push(Array(WORLD_SIZE).fill("roadGrassBelow"));
    } else if (i === 3 || i === 4) {
      tiles.push(Array(WORLD_SIZE).fill("road"));
    } else if (i === 5) {
      tiles.push(Array(WORLD_SIZE).fill("roadGrassAbove"));
    } else if (i === 7) {
      tiles.push(Array(WORLD_SIZE).fill("waterGrassBelow"));
    } else if (i === 8) {
      tiles.push(Array(WORLD_SIZE).fill("waterGrassAbove"));
    }
  }
  const yOffset = (100 / WORLD_SIZE) * (TILE_ASPECT_RATIO / 1.82);
  return (
    <>
      {tiles.map((row, y) => {
        const yBase = y !== 2 ? y * yOffset : y * yOffset * 1.25;
        const xBase = 50 - (100 / 18) * y;
        return row.map((tile, x) => {
          const z = x + 100;
          const yAbs = yBase + yOffset * x;
          const xAbs = xBase + (100 / 18) * x;
          let src;
          if (tile === "grass") {
            src = grass;
          } else if (tile === "road") {
            src = road;
          } else if (tile === "water") {
            src = water;
          } else if (tile === "roadGrassAbove") {
            src = roadGrassAbove;
          } else if (tile === "roadGrassBelow") {
            src = roadGrassBelow;
          } else if (tile === "waterGrassAbove") {
            src = waterGrassAbove;
          } else if (tile === "waterGrassBelow") {
            src = waterGrassBelow;
          }

          return <Tile key={`${x}${y}`} src={src} x={xAbs} y={yAbs} z={z} />;
        });
      })}
    </>
  );
}

export default React.memo(Landscape);
