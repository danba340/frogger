import React from "react";
import Landscape from "./Landscape";
import Frog from "./Frog";
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
