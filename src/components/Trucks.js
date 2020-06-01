import React from "react";
import { atom, useRecoilState } from "recoil";
import { useInterval } from "../hooks/useInterval";
import MovingObject from "./MovingObject";

function Trucks() {
  const trucksState = atom({
    key: "trucksState",
    default: [
      { x: -1, y: 5, dir: "down", id: Math.random() },
      { x: 9, y: 6, dir: "up", id: Math.random() },
    ],
  });
  const [trucks, setTrucks] = useRecoilState(trucksState);
  useInterval(() => {
    let trucksCopy = [...trucks];
    trucksCopy = trucksCopy.map((truck) => {
      if (truck.dir === "up") {
        return {
          ...truck,
          x: parseInt(truck.x) - 1,
        };
      } else {
        return {
          ...truck,
          x: parseInt(truck.x) + 1,
        };
      }
    });
    const newTrucks = [];
    if (!trucksCopy.filter((truck) => truck.x === 7 || truck.x === 1).length) {
      // const truckGoingUp = Math.random() > 0.5;
      // newTrucks.push({
      //   id: Math.random(),
      //   x: truckGoingUp ? 9 : -1,
      //   y: truckGoingUp ? 6 : 5,
      //   dir: truckGoingUp ? "up" : "down",
      // });
      newTrucks.push({
        id: Math.random(),
        x: 9,
        y: 6,
        dir: "up",
      });
      newTrucks.push({
        id: Math.random(),
        x: -1,
        y: 5,
        dir: "down",
      });
    }
    setTrucks(
      trucksCopy
        .filter((truck) => {
          return truck.x >= -1 && truck.x <= 9;
        })
        .concat(newTrucks)
    );
  }, 350);
  return (
    <>
      {trucks.map((truck) => {
        return (
          <MovingObject
            key={truck.id}
            x={truck.x}
            y={truck.y}
            dir={truck.dir}
            type="truck"
          />
        );
      })}
    </>
  );
}

export default Trucks;
