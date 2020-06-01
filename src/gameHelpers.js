import { WATER_TILES_Y_INDEXES } from "./constants";

export const isTruckCollision = (frog, trucks) => {
  return trucks.some((truck) => truck.x === frog.x && truck.y === frog.y);
};

export const isDrowning = (frog, boats) => {
  const boatUnderFrog = boats.some(
    (boat) => boat.x === frog.x && boat.y === frog.y
  );
  if (WATER_TILES_Y_INDEXES.includes(frog.y) && !boatUnderFrog) {
    return true;
  } else {
    return false;
  }
};

export const ridingBoat = (frog, boats) => {
  return boats.find((boat) => boat.x === frog.x && boat.y === frog.y);
};

export const hasReachedGoal = (frog) => {
  return frog.y === 0;
};
