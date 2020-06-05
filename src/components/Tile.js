import React from "react";

function Tile({ src, x, y, z }) {
  return (
    <img
      alt="piece of landscape"
      src={src}
      className="tile"
      style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
    />
  );
}

export default Tile;
