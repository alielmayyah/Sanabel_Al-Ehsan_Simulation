export const additionalTrophies = {
  treeStage: {
    milestones: [2, 3, 4],
    rewards: (stage) => ({
      xp: stage * 15,
      blue: stage * 5,
      yellow: stage * 5,
      red: stage * 5,
    }),
  },
  progressTree: {
    milestones: [1, 5, 10, 15, 30, 40],
    rewards: (times) => ({
      xp: times * 5,
      blue: Math.ceil(times / 1),
      yellow: Math.ceil(times / 1),
      red: Math.ceil(times / 1),
    }),
  },
  missionsFinished: {
    milestones: [1, 5, 10, 25, 50, 75, 100, 150, 250, 500, 750, 1000],
    rewards: (missions) => ({
      xp: Math.ceil(missions / 5),
      blue: Math.ceil(missions / 30),
      yellow: Math.ceil(missions / 30),
      red: Math.ceil(missions / 30),
    }),
  },
  totalBluePoints: {
    milestones: [5, 10, 25, 50, 100, 250, 500, 1000],
    rewards: (points) => ({
      blue: Math.floor(points / 10),
    }),
  },

  totalYellowPoints: {
    milestones: [5, 10, 25, 50, 100, 250, 500, 1000],
    rewards: (points) => ({
      yellow: Math.floor(points / 10),
    }),
  },
  totalRedPoints: {
    milestones: [5, 10, 25, 50, 100, 250, 500, 1000],
    rewards: (points) => ({
      red: Math.floor(points / 10),
    }),
  },
  totalMixedPoints: {
    milestones: [10, 25, 50, 100, 250, 500, 750, 1000, 2500],
    rewards: (points) => ({
      blue: Math.floor(points / 5),
      yellow: Math.floor(points / 5),
      red: Math.floor(points / 5),
    }),
  },
  totalXP: {
    milestones: [100, 250, 500, 1000, 2500, 5000, 7500, 10000, 25000],
    rewards: (xp) => ({
      xp: xp / 5,
    }),
  },

  totalWaterBought: {
    milestones: [5, 10, 25, 75, 50, 100, 150],
    rewards: (water) => ({
      water: Math.ceil(water / 10),
    }),
  },
  totalFertilizerBought: {
    milestones: [5, 10, 25, 75, 50, 100],
    rewards: (fertilizer) => ({
      fertilizer: Math.ceil(fertilizer / 15),
    }),
  },
};
