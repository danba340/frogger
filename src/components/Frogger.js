import React from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import World from "./World";
import Inputs from "./Inputs";

function Frogger() {
  // Frog
  const frogState = atom({ key: "frogState", default: {} });
  const [frog, setFrog] = useRecoilState(frogState);

  // Trucks
  const trucks = useRecoilValue(atom({ key: "trucksState" }));
  // Boats
  const boats = useRecoilValue(atom({ key: "boatsState" }));

  return (
    <>
      <World />
      <Inputs />
    </>
  );
}

export default Frogger;
