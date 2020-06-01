import React from "react";

function Tile({ src, x, y, z }) {
  return (
    <img
      alt="piece of landscape"
      className="tile"
      style={{ left: `${x}%`, top: `${y}%`, zIndex: z }}
      src={src}
    />
  );
}

export default Tile;
