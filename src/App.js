import React, { useState, useEffect } from "react";
import Landscape from "./components/Landscape";
import Buttons from "./components/Buttons";
import { useInterval } from "./hooks/useInterval";

function App() {
  const [frog, setFrog] = useState({ x: 4, y: 8, direction: "up" });
  const [boats, setBoats] = useState([
    { x: -1, y: 2, direction: "down", id: Math.random() },
    { x: 9, y: 1, direction: "up", id: Math.random() },
  ]);
  const [trucks, setTrucks] = useState([
    { x: -1, y: 5, direction: "down", id: Math.random() },
    { x: 9, y: 6, direction: "up", id: Math.random() },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [inputBlocked, setInputBlocked] = useState(false);

  useInterval(() => {
    const trucksCopy = [...trucks];
    trucksCopy.map((truck) => {
      if (truck.direction === "up") {
        return {
          x: truck.x--,
          ...truck,
        };
      } else if (truck.direction === "down") {
        return {
          x: truck.x++,
          ...truck,
        };
      }
    });
    const newTrucks = [];
    if (!trucksCopy.filter((truck) => truck.x === 7 || truck.x === 1).length) {
      const truckGoingUp = Math.random() > 0.5;
      newTrucks.push({
        id: Math.random(),
        x: truckGoingUp ? 9 : -1,
        y: truckGoingUp ? 6 : 5,
        direction: truckGoingUp ? "up" : "down",
      });
    }
    setTrucks(
      trucksCopy
        .filter((truck) => {
          return truck.x >= -1 && truck.x <= 9;
        })
        .concat(newTrucks)
    );
    const boatsCopy = [...boats];
    boatsCopy.map((boat) => {
      if (boat.direction === "up") {
        return {
          ...boat,
          x: boat.x--,
        };
      } else if (boat.direction === "down") {
        return {
          ...boat,
          x: boat.x++,
        };
      }
    });
    const newBoats = [];
    if (!boatsCopy.filter((boat) => boat.x === 7 || boat.x === 1).length) {
      newBoats.push(
        {
          id: Math.random(),
          x: 9,
          y: 1,
          direction: "up",
        },
        {
          id: Math.random(),
          x: -1,
          y: 2,
          direction: "down",
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
  }, 750);

  useEffect(() => {
    window.addEventListener("keydown", keyPressHandler);
    return () => {
      window.removeEventListener("keydown", keyPressHandler);
    };
  });

  const keyPressHandler = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    if (inputBlocked) {
      return;
    }
    setInputBlocked(true);
    setTimeout(() => {
      setInputBlocked(false);
    }, 250);
    if (!gameOver) {
      if (e.keyCode === 37) {
        // left
        setFrog({
          x: frog.x > 0 ? frog.x - 1 : 0,
          y: frog.y,
          direction: "left",
        });
      } else if (e.keyCode === 39) {
        // right
        setFrog({
          x: frog.x < 8 ? frog.x + 1 : 8,
          y: frog.y,
          direction: "right",
        });
      } else if (e.keyCode === 38) {
        // up
        setFrog({
          x: frog.x,
          y: frog.y > 0 ? frog.y - 1 : 0,
          direction: "up",
        });
      } else if (e.keyCode === 40) {
        // down
        setFrog({
          x: frog.x,
          y: frog.y < 8 ? frog.y + 1 : 8,
          direction: "down",
        });
      }
    }
  };

  return (
    <div className="App">
      <h1>Frogger</h1>
      <Landscape frog={frog} boats={boats} trucks={trucks} />
      <Buttons onPress={keyPressHandler} />
    </div>
  );
}

export default App;
