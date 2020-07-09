import React, { useEffect } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import World from "./World";
import Inputs from "./Inputs";
import {
  isDrowning,
  isTruckCollision,
  hasReachedGoal,
  getRiddenBoat,
  isRidingBoat,
  objectsIdentical,
} from "../gameHelpers";

function Frogger() {
  //Score
  const scoreState = atom({
    key: "scoreState",
    default: 0,
  });
  const [score, setScore] = useRecoilState(scoreState);
  // HighScore
  const highScoreState = atom({
    key: "highScoreState",
    default: 0,
  });
  const [highScore, setHighScore] = useRecoilState(highScoreState);
  // Gameover
  const [gameOver, setGameOver] = useRecoilState(
    atom({ key: "gameOverState", default: false })
  );
  // Frog
  const frogState = atom({ key: "frogState", default: {} });
  const [frog, setFrog] = useRecoilState(frogState);

  // Trucks
  const trucks = useRecoilValue(atom({ key: "trucksState" }));
  // Boats
  const boats = useRecoilValue(atom({ key: "boatsState" }));

  // Check for hit by truck
  useEffect(() => {
    if (trucks && isTruckCollision(frog, trucks)) {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!frog.dead) {
        setFrog({ ...frog, dead: true });
      }
    }
  }, [trucks, frog, setFrog, gameOver, setGameOver]);

  useEffect(() => {
    // Check for drowning
    if (boats && isRidingBoat(frog, boats)) {
      console.log("riding", frog);
      const boat = getRiddenBoat(frog, boats);
      if (!objectsIdentical(frog, { ...frog, x: boat.x, y: boat.y })) {
        setFrog({ ...frog, x: boat.x, y: boat.y });
      }
    } else if (boats && isDrowning(frog, boats)) {
      if (!gameOver) {
        setGameOver(true);
      }
      if (!frog.dead) {
        setFrog({ ...frog, dead: true });
      }
      console.log("Drown", frog);
    }
  }, [boats, frog, setFrog, gameOver, setGameOver]);

  useEffect(() => {
    // Check for reaching goal
    if (hasReachedGoal(frog)) {
      setScore(score + 1);
      if (score + 1 > highScore) {
        setHighScore(score + 1);
      }
      setFrog({ ...frog, x: 4, y: 8 });
    }
  }, [frog, setFrog, score, setScore, highScore, setHighScore]);

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}

export default Frogger;
