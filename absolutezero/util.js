export const calcDist = (self, other) => {
  return Math.sqrt((self.x - other.x)**2 + (self.y - other.y)**2)
};
