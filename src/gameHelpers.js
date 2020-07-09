export const isTruckCollision = (frog, trucks) => {
  return trucks.some((truck) => {
    return truck.x === frog.x && truck.y === frog.y;
  });
};
export const isRidingBoat = (frog, boats) => {
  return boats.some((boat) => {
    return boat.x === frog.x && boat.y === frog.y;
  });
};
export const getRiddenBoat = (frog, boats) => {
  return boats.find((boat) => {
    return boat.y === frog.y && Math.abs(boat.x - frog.x) <= 1;
  });
};

export const isDrowning = (frog, boats) => {
  const waterTilesYIndexes = [1, 2];
  const isRiding = isRidingBoat(frog, boats);
  if (waterTilesYIndexes.includes(frog.y) && !isRiding) {
    return true;
  } else {
    return false;
  }
};

export const hasReachedGoal = (frog) => {
  return frog.y < 0;
};

export const objectsIdentical = (o1, o2) => {
  return JSON.stringify(o1) === JSON.stringify(o2);
};
