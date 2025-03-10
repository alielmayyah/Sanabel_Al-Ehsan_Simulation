export const generateMissionRewards = (
  type,
  count,
  baseRewards,
  milestonesOverrides = {}
) => {
  const missions = {};

  for (let i = 1; i <= count; i++) {
    const key = `${type}${i}`;
    const milestones = milestonesOverrides[i] || baseRewards.trophyMilestones;
    missions[key] = {
      blue: baseRewards.blue,
      yellow: baseRewards.yellow,
      red: baseRewards.red,
      xp: baseRewards.xp,
      trophyMilestones: milestones,
      trophyRewards: (milestone) => ({
        xp: milestone * baseRewards.xpMultiplier,
        blue: Math.ceil(milestone * baseRewards.blueMultiplier),
        yellow: Math.ceil(milestone * baseRewards.yellowMultiplier),
        red: Math.ceil(milestone * baseRewards.redMultiplier),
      }),
    };
  }

  return missions;
};

export const missionRewards = {
  ...generateMissionRewards(
    "sanabelA",
    8,
    {
      blue: 2,
      yellow: 2,
      red: 2,
      xp: 5,
      trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
      xpMultiplier: 1,
      blueMultiplier: 0.6 * 0.5,
      yellowMultiplier: 0.6 * 0.5,
      redMultiplier: 0.6 * 0.5,
    },
    {
      1: [1, 5, 10, 25, 50, 75, 100, 150, 250, 500, 750, 1000],
    }
  ),

  ...generateMissionRewards("sanabelB", 4, {
    blue: 2,
    yellow: 1,
    red: 1,
    xp: 5,
    trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
    xpMultiplier: 1,
    blueMultiplier: 0.6 * 0.5,
    yellowMultiplier: 0.3 * 0.5,
    redMultiplier: 0.3 * 0.5,
  }),

  ...generateMissionRewards("sanabelC", 19, {
    blue: 1,
    yellow: 2,
    red: 1,
    xp: 5,
    trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
    xpMultiplier: 1,
    blueMultiplier: 0.3 * 0.5,
    yellowMultiplier: 0.6 * 0.5,
    redMultiplier: 0.3 * 0.5,
  }),

  ...generateMissionRewards("sanabelD", 4, {
    blue: 1,
    yellow: 1,
    red: 2,
    xp: 5,
    trophyMilestones: [1, 5, 10, 25, 50, 75, 100],
    xpMultiplier: 1,
    blueMultiplier: 0.3 * 0.5,
    yellowMultiplier: 0.3 * 0.5,
    redMultiplier: 0.6 * 0.5,
  }),
};
