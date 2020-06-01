import React, { useEffect } from "react";
import {
  atom,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import useLocalStorage from "../hooks/useLocalStorage";
import World from "./World";
import Inputs from "./Inputs";
import {
  isDrowning,
  isTruckCollision,
  hasReachedGoal,
  ridingBoat,
} from "../gameHelpers";

function Frogger() {
  //Score
  const scoreState = atom({
    key: "scoreState",
    default: 0,
  });
  // High Score
  const [highScore, setHighScore] = useLocalStorage("highScore", 0);
  const [score, setScore] = useRecoilState(scoreState);
  // Gameover
  const setGameOver = useSetRecoilState(atom({ key: "gameOverState" }));
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
      setGameOver(true);
      setFrog({ ...frog, dead: true });
    }
  }, [trucks, frog, setFrog, setGameOver]);

  useEffect(() => {
    // Check for drowning
    if (boats && ridingBoat(frog, boats)) {
      const boat = ridingBoat(frog, boats);
      if (boat.dir === "up") {
        setFrog({ ...frog, x: boat.x - 1, y: boat.y });
      } else {
        setFrog({ ...frog, x: boat.x + 1, y: boat.y });
      }
    } else if (boats && isDrowning(frog, boats)) {
      setGameOver(true);
      setFrog({ ...frog, dead: true });
    }
  }, [boats, frog, setFrog, setGameOver]);

  useEffect(() => {
    // Check for reaching goal
    if (hasReachedGoal(frog)) {
      setScore(score + 1);
      if (score > highScore) {
        setHighScore(score);
      }
      setFrog({ ...frog, dead: true });
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
