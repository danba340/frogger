import React, { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import { useInterval } from "../hooks/useInterval";
import MovingObject from "./MovingObject";

function Boats() {
  const boatsState = atom({
    key: "boatsState",
    default: [
      { x: -1, y: 2, dir: "down", id: Math.random().toString(36).substr(2, 9) },
      { x: 9, y: 1, dir: "up", id: Math.random().toString(36).substr(2, 9) },
    ],
  });
  const [boats, setBoats] = useRecoilState(boatsState);

  const moveBoats = useCallback(() => {
    let boatsCopy = [...boats];
    boatsCopy = boatsCopy.map((boat) => {
      if (boat.dir === "up") {
        return {
          ...boat,
          x: parseInt(boat.x - 1),
        };
      } else {
        return {
          ...boat,
          x: parseInt(boat.x) + 1,
        };
      }
    });
    const newBoats = [];
    if (!boatsCopy.filter((boat) => boat.x === 7 || boat.x === 1).length) {
      newBoats.push(
        {
          id: Math.random().toString(36).substr(2, 9),
          x: 9,
          y: 1,
          dir: "up",
        },
        {
          id: Math.random().toString(36).substr(2, 9),
          x: -1,
          y: 2,
          dir: "down",
        }
      );
    }
    setBoats(
      boatsCopy
        .filter((boat) => {
          return boat.x >= -1 && boat.x <= 9;
        })
        .concat(newBoats)
    );
  }, [boats, setBoats]);

  useInterval(() => {
    moveBoats();
  }, 350);

  return (
    <>
      {boats.map((boat) => {
        return (
          <MovingObject
            key={boat.id}
            x={boat.x}
            y={boat.y}
            dir={boat.dir}
            type="boat"
          />
        );
      })}
    </>
  );
}

export default Boats;
