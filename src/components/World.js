import React from "react";
import Frog from "./Frog";
import Landscape from "./Landscape";
import Trucks from "./Trucks";
import Boats from "./Boats";

function World() {
  return (
    <div className="world">
      <Landscape />
      <Trucks />
      <Boats />
      <Frog />
    </div>
  );
}

export default World;
