import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import World from "./World";
import Inputs from "./Inputs";
import {
  isTruckCollision,
  isDrowning,
  isRidingBoat,
  getRiddenBoat,
  hasReachedGoal,
  objectsIdentical,
} from "../gameHelpers";

function Frogger() {
  // Frog
  const frogState = atom({ key: "frogState", default: {} });
  const [frog, setFrog] = useRecoilState(frogState);

  // Trucks
  const trucks = useRecoilValue(atom({ key: "trucksState" }));
  // Boats
  const boats = useRecoilValue(atom({ key: "boatsState" }));
  // Gameover
  const [gameOver, setGameOver] = useRecoilState(
    atom({ key: "gameOverState", default: false })
  );

  // Check for truck collision
  useEffect(() => {
    if (trucks && isTruckCollision(frog, trucks)) {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!frog.dead) {
        setFrog({
          ...frog,
          dead: true,
        });
      }
    }
  }, [frog, trucks, setFrog, setGameOver]);

  // Check for boat interaction
  useEffect(() => {
    if (boats && isDrowning(frog, boats)) {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!frog.dead) {
        setFrog({
          ...frog,
          dead: true,
        });
      }
    } else if (boats && isRidingBoat(frog, boats)) {
      const boat = getRiddenBoat(frog, boats);
      if (!objectsIdentical(frog, { ...frog, x: boat.x, y: boat.y })) {
        setFrog({
          ...frog,
          x: boat.x,
          y: boat.y,
        });
      }
    }
  }, [frog, boats, setFrog, setGameOver]);

  // Reaching goal
  useEffect(() => {
    if (hasReachedGoal(frog)) {
      setFrog({ ...frog, x: 4, y: 8 });
    }
  }, [frog, setFrog]);

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}

export default Frogger;
