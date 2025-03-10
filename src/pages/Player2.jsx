import { medalsImgs } from "../data/medals";
import blueIcon from "../assets/resources/سنبلة زرقاء.png";
import yellowIcon from "../assets/resources/سنبلة صفراء.png";
import redIcon from "../assets/resources/سنبلة حمراء.png";
import xp from "../assets/resources/اكس بي.png";
import water from "../assets/resources/ماء.png";
import fertilizer from "../assets/resources/سماد.png";
import sanabelIcon from "../assets/resources/سنابل.png";
import { missionRewards } from "../data/missionsdata";
import { useState } from "react";
import { useEffect } from "react";
import { additionalTrophies } from "../data/otherTrophies";
import { treeStages } from "../data/TreeStages";
import Tree from "../components/Tree";
import { motion, AnimatePresence } from "framer-motion";
import { useRef } from "react";
const Player = () => {
  // Simulate Users
  const [user, setUser] = useState({
    blue: 0,
    red: 0,
    yellow: 0,

    xp: 0,

    level: 1,
    medal: 1,
    water: 0,
    fertilizer: 0,

    currentStage: 0,
    treeStage: 1,

    waterNeeded: 0,
    fertilizerNeeded: 0,

    // totals

    totalBlue: 0,
    totalRed: 0,
    totalYellow: 0,
    totalXP: 0,

    totalSanabelPoints: 0,

    totalMissions: 0,
    totalSanabelA: 0,
    totalSanabelB: 0,
    totalSanabelC: 0,
    totalSanabelD: 0,

    totalWaterBought: 0,
    totalFertilizerBought: 0,
  });

  useEffect(() => {
    const newTreeStage =
      user.currentStage >= 50
        ? 5
        : user.currentStage >= 30
        ? 4
        : user.currentStage >= 15
        ? 3
        : user.currentStage >= 5
        ? 2
        : 1;

    if (user.treeStage !== newTreeStage) {
      setUser((prevUser) => ({
        ...prevUser,
        treeStage: newTreeStage, // Set treeStage directly
      }));
    }
  }, [user.currentStage, user.treeStage]);

  // State to track mission progress counts
  const [missionCounters, setMissionCounters] = useState(() => {
    const initialCounters = {};
    Object.keys(missionRewards).forEach((key) => {
      initialCounters[key] = 0; // Initialize all counters to 0
    });
    return initialCounters;
  });
  const [earnedTrophies, setEarnedTrophies] = useState([]);
  const calculateLevel = (totalXp, baseXp = 10, increment = 5) => {
    let level = 1;
    let xpForNextLevel = baseXp;
    const medals = [1]; // Include medal 1 by default

    const medalLevels = [1, 5, 10, 25, 50, 75, 100, 150, 200];

    while (totalXp >= xpForNextLevel) {
      totalXp -= xpForNextLevel;
      level++;
      xpForNextLevel = baseXp + increment * (level - 1);

      if (medalLevels.includes(level)) {
        medals.push(level); // Add the level to track the medal
      }
    }

    // Remaining XP to the next level
    const xpToNextLevel = xpForNextLevel - totalXp;

    return { level, medals, xpToNextLevel };
  };

  // Update level and medal
  const [medalImgTracker, setMedalImgTracker] = useState(0);
  useEffect(() => {
    if (user.level < 5) {
      setMedalImgTracker(0);
    } else if (user.level >= 5 && user.level < 10) {
      setMedalImgTracker(1);
    } else if (user.level >= 10 && user.level < 25) {
      setMedalImgTracker(2);
    } else if (user.level >= 25 && user.level < 50) {
      setMedalImgTracker(3);
    } else if (user.level >= 50 && user.level < 75) {
      setMedalImgTracker(4);
    } else if (user.level >= 75 && user.level < 100) {
      setMedalImgTracker(5);
    } else if (user.level >= 100 && user.level < 150) {
      setMedalImgTracker(6);
    } else if (user.level >= 150 && user.level < 200) {
      setMedalImgTracker(7);
    } else {
      setMedalImgTracker(8);
    }
  }, [user.level]);

  function progressMissions(missionKey, mission) {
    // Update the user's state based on the mission rewards
    setUser((prevUser) => {
      const newTotalXP = prevUser.xp + mission.xp;
      const { level, medals } = calculateLevel(newTotalXP);

      // Update totals based on mission category
      const sanabelCategory = missionKey.startsWith("sanabelA")
        ? "totalSanabelA"
        : missionKey.startsWith("sanabelB")
        ? "totalSanabelB"
        : missionKey.startsWith("sanabelC")
        ? "totalSanabelC"
        : missionKey.startsWith("sanabelD")
        ? "totalSanabelD"
        : null;

      return {
        ...prevUser,
        blue: prevUser.blue + mission.blue,
        red: prevUser.red + mission.red,
        yellow: prevUser.yellow + mission.yellow,
        xp: newTotalXP,
        totalXP: newTotalXP,
        level,
        medal: medals[medals.length - 1], // Use the last medal in the array

        totalBlue: prevUser.totalBlue + mission.blue,
        totalRed: prevUser.totalRed + mission.red,
        totalYellow: prevUser.totalYellow + mission.yellow,
        totalSanabelPoints:
          prevUser.totalSanabelPoints +
          mission.yellow +
          mission.red +
          mission.blue,
        totalMissions: prevUser.totalMissions + 1,
        ...(sanabelCategory && {
          [sanabelCategory]: prevUser[sanabelCategory] + 1,
        }),
      };
    });

    // Increment mission counters for specific mission
    setMissionCounters((prevCounters) => ({
      ...prevCounters,
      [missionKey]: prevCounters[missionKey] + 1,
    }));

    // Check if a trophy milestone is reached
    if (mission.trophyMilestones) {
      mission.trophyMilestones.forEach((milestone) => {
        if (
          missionCounters[missionKey] + 1 === milestone &&
          !earnedTrophies.some(
            (trophy) =>
              trophy.missionKey === missionKey && trophy.milestone === milestone
          )
        ) {
          // Calculate the reward using the trophyRewards function
          const reward = mission.trophyRewards(milestone);
          setEarnedTrophies((prevTrophies) => [
            ...prevTrophies,
            { missionKey, milestone, reward },
          ]);
        }
      });
    }
  }

  const missionRewardsByCategory = {
    "Sanabel A": Object.entries(missionRewards).filter(([key, mission]) =>
      key.startsWith("sanabelA")
    ),
    "Sanabel B": Object.entries(missionRewards).filter(([key, mission]) =>
      key.startsWith("sanabelB")
    ),
    "Sanabel C": Object.entries(missionRewards).filter(([key, mission]) =>
      key.startsWith("sanabelC")
    ),
    "Sanabel D": Object.entries(missionRewards).filter(([key, mission]) =>
      key.startsWith("sanabelD")
    ),
  };

  // SHOP

  const treeGrowth = [
    { frame: 1, water: 0, fertilizer: 0, waterCost: 10, fertilizerCost: 10 },
    { frame: 2, water: 1, fertilizer: 1, waterCost: 10, fertilizerCost: 10 },
    { frame: 3, water: 1, fertilizer: 1, waterCost: 15, fertilizerCost: 15 },
    { frame: 4, water: 1, fertilizer: 1, waterCost: 20, fertilizerCost: 20 },
    { frame: 5, water: 1, fertilizer: 1, waterCost: 35, fertilizerCost: 35 },
    { frame: 6, water: 5, fertilizer: 5, waterCost: 20, fertilizerCost: 20 },
    { frame: 7, water: 2, fertilizer: 2 },
    { frame: 8, water: 2, fertilizer: 2 },
    { frame: 9, water: 2, fertilizer: 2 },
    { frame: 10, water: 2, fertilizer: 2 },
    { frame: 11, water: 2, fertilizer: 2 },
    { frame: 12, water: 3, fertilizer: 2 },
    { frame: 13, water: 3, fertilizer: 2 },
    { frame: 14, water: 3, fertilizer: 2 },
    { frame: 15, water: 3, fertilizer: 2 },
    { frame: 16, water: 10, fertilizer: 10 },
    { frame: 17, water: 4, fertilizer: 3 },
    { frame: 18, water: 4, fertilizer: 3 },
    { frame: 19, water: 4, fertilizer: 3 },
    { frame: 20, water: 4, fertilizer: 3 },
    { frame: 21, water: 4, fertilizer: 3 },
    { frame: 22, water: 4, fertilizer: 3 },
    { frame: 23, water: 4, fertilizer: 3 },
    { frame: 24, water: 4, fertilizer: 3 },
    { frame: 25, water: 5, fertilizer: 3 },
    { frame: 26, water: 5, fertilizer: 3 },
    { frame: 27, water: 5, fertilizer: 3 },
    { frame: 28, water: 5, fertilizer: 3 },
    { frame: 29, water: 5, fertilizer: 3 },
    { frame: 30, water: 5, fertilizer: 3 },
    { frame: 31, water: 15, fertilizer: 15 },
    { frame: 32, water: 6, fertilizer: 4 },
    { frame: 33, water: 6, fertilizer: 4 },
    { frame: 34, water: 6, fertilizer: 4 },
    { frame: 35, water: 6, fertilizer: 4 },
    { frame: 36, water: 6, fertilizer: 4 },
    { frame: 37, water: 6, fertilizer: 4 },
    { frame: 38, water: 7, fertilizer: 4 },
    { frame: 39, water: 7, fertilizer: 4 },
    { frame: 40, water: 7, fertilizer: 4 },
    { frame: 41, water: 7, fertilizer: 4 },
    { frame: 42, water: 7, fertilizer: 4 },
    { frame: 43, water: 7, fertilizer: 4 },
    { frame: 44, water: 7, fertilizer: 4 },
    { frame: 45, water: 7, fertilizer: 4 },
    { frame: 46, water: 7, fertilizer: 4 },
    { frame: 47, water: 7, fertilizer: 4 },
    { frame: 48, water: 7, fertilizer: 4 },
    { frame: 49, water: 7, fertilizer: 4 },
    { frame: 50, water: 7, fertilizer: 4 },
    { frame: 51, water: 20, fertilizer: 20 },
  ];

  const [buyWaterCount, setBuyWaterCount] = useState(0);

  const [buyFertilizerCount, setBuyFertilizerCount] = useState(0);

  function changeBuyWaterCount(operation) {
    if (operation === "-" && buyWaterCount !== 0) {
      setBuyWaterCount(buyWaterCount - 1);
    }
    if (operation === "+" && buyWaterCount !== 20) {
      setBuyWaterCount(buyWaterCount + 1);
    }
  }

  function changeBuyFertilzerCount(operation) {
    if (operation === "-" && buyFertilizerCount !== 0) {
      setBuyFertilizerCount(buyFertilizerCount - 1);
    }
    if (operation === "+" && buyFertilizerCount !== 20) {
      setBuyFertilizerCount(buyFertilizerCount + 1);
    }
  }

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProgress = () => {
    if (
      user.water >= treeGrowth[user.currentStage].water &&
      user.fertilizer >= treeGrowth[user.currentStage].fertilizer
    ) {
      setIsPopupOpen(true); // Open popup

      // Update the currentStage
      setUser((prevUser) => ({
        ...prevUser, // Copy the previous state
        currentStage: prevUser.currentStage + 1,
        water: prevUser.water - treeGrowth[user.currentStage].water,
        fertilizer:
          prevUser.fertilizer - treeGrowth[user.currentStage].fertilizer,
      }));
    } else {
      alert("Buy water or fertilizer");
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleBuy = () => {
    const totalWaterCost =
      treeGrowth[user.currentStage].waterCost * buyWaterCount; // Calculate water cost
    const totalFertilizerCost =
      treeGrowth[user.currentStage].fertilizerCost * buyFertilizerCount; // Calculate fertilizer cost

    // Check if the user has enough resources for each purchase
    if (
      user.blue >= totalWaterCost + totalFertilizerCost &&
      user.red >= totalWaterCost + totalFertilizerCost &&
      user.yellow >= totalWaterCost + totalFertilizerCost
    ) {
      setUser((prevUser) => ({
        ...prevUser, // Copy the previous state
        blue: prevUser.blue - totalWaterCost - totalFertilizerCost,
        red: prevUser.red - totalWaterCost - totalFertilizerCost,
        yellow: prevUser.yellow - totalWaterCost - totalFertilizerCost,
        water: prevUser.water + buyWaterCount, // Add bought water
        fertilizer: prevUser.fertilizer + buyFertilizerCount, // Add bought fertilizer
        totalWaterBought: prevUser.totalWaterBought + buyWaterCount, // Track total water bought
        totalFertilizerBought:
          prevUser.totalFertilizerBought + buyFertilizerCount, // Track total fertilizer bought
      }));

      // Reset the buy counts after successful purchase
      setBuyWaterCount(0);
      setBuyFertilizerCount(0);
    } else {
      const missingResources = [];
      if (user.blue < totalWaterCost + totalFertilizerCost)
        missingResources.push("Blue");
      if (user.red < totalWaterCost + totalFertilizerCost)
        missingResources.push("Red");
      if (user.yellow < totalWaterCost + totalFertilizerCost)
        missingResources.push("Yellow");

      alert(`Not enough resources! Missing: ${missingResources.join(", ")}`);
    }
  };

  useEffect(() => {
    const checkTrophyMilestones = () => {
      Object.entries(additionalTrophies).forEach(([trophyKey, trophy]) => {
        const { milestones, rewards } = trophy;
        let userValue;

        switch (trophyKey) {
          case "treeStage":
            userValue = user.treeStage;
            break;
          case "progressTree":
            userValue = user.stage;
            break;
          case "missionsFinished":
            userValue = user.totalMissions;
            break;
          case "totalBluePoints":
            userValue = user.totalBlue;
            break;
          case "totalYellowPoints":
            userValue = user.totalYellow;
            break;
          case "totalRedPoints":
            userValue = user.totalRed;
            break;
          case "totalMixedPoints":
            userValue = user.totalBlue + user.totalYellow + user.totalRed;
            break;
          case "totalXP":
            userValue = user.totalXP;
            break;
          case "totalWaterBought":
            userValue = user.totalWaterBought;
            break;
          case "totalFertilizerBought":
            userValue = user.totalFertilizerBought;
            break;
          default:
            userValue = 0;
        }

        milestones.forEach((milestone) => {
          if (
            userValue >= milestone &&
            !earnedTrophies.some(
              (trophy) =>
                trophy.missionKey === trophyKey &&
                trophy.milestone === milestone
            )
          ) {
            const reward = rewards(milestone);
            setEarnedTrophies((prevTrophies) => [
              ...prevTrophies,
              { missionKey: trophyKey, milestone, reward },
            ]);

            // Optionally, apply rewards to the user state
            setUser((prevUser) => ({
              ...prevUser,
              xp: prevUser.xp + (reward.xp || 0),
              blue: prevUser.blue + (reward.blue || 0),
              yellow: prevUser.yellow + (reward.yellow || 0),
              red: prevUser.red + (reward.red || 0),
              water: prevUser.water + (reward.water || 0),
              fertilizer: prevUser.fertilizer + (reward.fertilizer || 0),
            }));
          }
        });
      });
    };

    checkTrophyMilestones();
  }, [
    user.totalXP,
    user.totalMissions,
    user.totalBlue,
    user.totalYellow,
    user.totalRed,
    user.totalWaterBought,
    user.totalFertilizerBought,
    user.stage,
    missionCounters.progressTree,
    earnedTrophies,
  ]);

  // PROGRESS FAST

  const [isHolding, setIsHolding] = useState(false);
  const intervalRef = useRef(null);

  const handleMouseDown = (key, mission) => {
    setIsHolding(true);
    intervalRef.current = setInterval(() => {
      progressMissions(key, mission);
    }, 100); // Adjust the interval time as needed (100ms in this example)
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    // Stop the action if the user moves the cursor away while holding down
    if (isHolding) {
      setIsHolding(false);
      clearInterval(intervalRef.current);
    }
  };

  return (
    <div className="flex justify-between p-5  w-full h-full gap-3">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl text-black">Missions</h1>
        <div className="flex flex-col gap-4 w-full h-full overflow-y-auto">
          {/* Group missions by category */}
          {Object.entries(missionRewardsByCategory).map(
            ([category, missions]) => (
              <div
                key={category}
                className="p-4 rounded-xl border-2 shadow-md flex flex-col gap-4"
              >
                <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {missions.map(([key, mission]) => (
                    <div
                      key={key}
                      className="p-2 rounded-lg border flex items-center justify-center w-full gap-5"
                    >
                      {/* Render each mission here */}
                      <h3 className="font-bold text-lg">{key}</h3>
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-2">
                          <img src={blueIcon} alt="" className="w-6 h-8" />
                          <p className="text-blue-500">{mission.blue}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <img src={yellowIcon} alt="" className="w-6 h-8" />
                          <p className="text-yellow-500">{mission.yellow}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <img src={redIcon} alt="" className="w-6 h-8" />
                          <p className="text-red-500">{mission.red}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <img src={xp} alt="" className="w-6 h-6" />
                          <p className="text-blue-500">{mission.xp}</p>
                        </div>
                      </div>
                      <h1 clas>Count {missionCounters[key]}</h1>
                      <div
                        className="flex flex-center justify-center px-2 bg-red-500 text-white rounded-lg cursor-pointer"
                        onMouseDown={() => handleMouseDown(key, mission)}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => progressMissions(key, mission)}
                      >
                        <h1>Progress</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <div className="flex-col flex justify-between h-full">
        {" "}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl text-black">Inventory</h1>
          <div className="p-4 rounded-xl border-2 shadow-md flex flex-col gap-4 w-full h-full overflow-y-auto">
            {/* Display current points */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                Points
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <img src={blueIcon} alt="Blue" className="w-6 h-8" />
                  <p className="text-lg text-blue-500">{user.blue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={yellowIcon} alt="Yellow" className="w-6 h-8" />
                  <p className="text-lg text-yellow-500">{user.yellow}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={redIcon} alt="Red" className="w-6 h-8" />
                  <p className="text-lg text-red-500">{user.red}</p>
                </div>
              </div>
            </div>

            {/* Display water and fertilizer */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                Resources
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <img src={water} alt="Water" className="w-8 h-8" />
                  <p className="text-lg text-blue-500">{user.water}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={fertilizer} alt="Fertilizer" className="w-8 h-8" />
                  <p className="text-lg text-green-500">{user.fertilizer}</p>
                </div>
              </div>
            </div>

            {/* Display level, medal, and progress bar */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                Progress
              </h2>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <img
                    src={medalsImgs[medalImgTracker]}
                    alt={`Medal ${user.medal}`}
                    className="w-16 h-16"
                  />
                  <p className="text-lg font-bold">Level {user.level}</p>
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 h-4 rounded-full"
                      style={{
                        width: `${
                          ((user.xp - calculateLevel(user.xp).levelXP) /
                            calculateLevel(user.xp + 1).levelXP) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    {user.xp} XP / {calculateLevel(user.xp).xpToNextLevel} XP to
                    next level
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl text-black">Total Gathered </h1>
          <div className="p-4 rounded-xl border-2 shadow-md flex flex-col gap-4 w-full h-full overflow-y-auto">
            {/* Display current points */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                Total Points Gathered
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <img src={blueIcon} alt="Blue" className="w-6 h-8" />
                  <p className="text-lg text-blue-500">{user.totalBlue}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={yellowIcon} alt="Yellow" className="w-6 h-8" />
                  <p className="text-lg text-yellow-500">{user.totalYellow}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={redIcon} alt="Red" className="w-6 h-8" />
                  <p className="text-lg text-red-500">{user.totalRed}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={sanabelIcon} alt="Red" className="w-8 h-8" />
                  <p className="text-lg text-gray-500">
                    {user.totalSanabelPoints}
                  </p>
                </div>
              </div>
            </div>

            {/* Display water and fertilizer */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                Resources
              </h2>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <img src={water} alt="Water" className="w-8 h-8" />
                  <p className="text-lg text-blue-500">
                    {user.totalWaterBought}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={fertilizer} alt="Fertilizer" className="w-8 h-8" />
                  <p className="text-lg text-green-500">
                    {user.totalFertilizerBought}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <p className="text-lg text-black-500">
                  Total Missions Done:{" "}
                  <span className="text-blue-500">{user.totalMissions}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg text-black-500">
                  SanabelA :{" "}
                  <span className="text-blue-500">{user.totalSanabelA}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg text-black-500">
                  Sanabelb:{" "}
                  <span className="text-blue-500">{user.totalSanabelB}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg text-black-500">
                  SanabelC:{" "}
                  <span className="text-blue-500">{user.totalSanabelC}</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg text-black-500">
                  SanabelD:{" "}
                  <span className="text-blue-500">{user.totalSanabelD}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col flex justify-between h-full">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl text-black">Tree</h1>
          <div className="p-4 rounded-xl border-2 shadow-md flex flex-col gap-4 w-full h-full overflow-y-auto">
            {/* Display SHOP points */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-gray-700 border-b pb-2">
                Shop
              </h2>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 justify-around w-full ">
                  <img src={water} alt="Water" className="w-8 h-8" />
                  <p
                    className="text-2xl bg-blue-300 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => changeBuyWaterCount("-")}
                  >
                    -
                  </p>
                  <p className="text-lg text-blue-500">{buyWaterCount}</p>
                  <p
                    className="text-2xl bg-blue-300 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => changeBuyWaterCount("+")}
                  >
                    +
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img src={blueIcon} alt="Blue" className="w-4 h-6" />
                      <p className="text-lg text-blue-500">
                        {treeGrowth[user.currentStage].waterCost *
                          buyWaterCount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={yellowIcon} alt="Yellow" className="w-4 h-6" />
                      <p className="text-lg text-yellow-500">
                        {" "}
                        {treeGrowth[user.currentStage].waterCost *
                          buyWaterCount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={redIcon} alt="Red" className="w-4 h-6" />
                      <p className="text-lg text-red-500">
                        {" "}
                        {treeGrowth[user.currentStage].waterCost *
                          buyWaterCount}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-around w-full ">
                  <img src={fertilizer} alt="Fertilizer" className="w-8 h-8" />
                  <p
                    className="text-2xl bg-green-500 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => changeBuyFertilzerCount("-")}
                  >
                    -
                  </p>
                  <p className="text-lg text-green-500">{buyFertilizerCount}</p>
                  <p
                    className="text-2xl bg-green-500 cursor-pointer text-white rounded-full w-6 h-6 flex items-center justify-center"
                    onClick={() => changeBuyFertilzerCount("+")}
                  >
                    +
                  </p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img src={blueIcon} alt="Blue" className="w-4 h-6" />
                      <p className="text-lg text-blue-500">
                        {treeGrowth[user.currentStage].fertilizerCost *
                          buyFertilizerCount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={yellowIcon} alt="Yellow" className="w-4 h-6" />
                      <p className="text-lg text-yellow-500">
                        {" "}
                        {treeGrowth[user.currentStage].fertilizerCost *
                          buyFertilizerCount}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={redIcon} alt="Red" className="w-4 h-6" />
                      <p className="text-lg text-red-500">
                        {" "}
                        {treeGrowth[user.currentStage].fertilizerCost *
                          buyFertilizerCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="px-2 w-1/3 bg-blue-600 text-white rounded-xl text-center mx-auto cursor-pointer"
                onClick={handleBuy}
              >
                Buy
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full h-3/4">
          <div className="h-full  flex flex-col items-center w-2/12 ">
            <img src={water} alt="" className="h-8 w-8" />
            <div className="h-3/4 flex items-center justify-center border-2 rounded-t-3xl relative w-full">
              {/* Outer container */}
              <div
                className="w-full   rounded-t-3xl relative overflow-hidden"
                style={{
                  height: "100%",
                }}
              >
                {/* Dynamic progress bar */}
                <div
                  className="w-full"
                  style={{
                    backgroundColor: "#48bcfe", // Set the color for the progress
                    height: `${
                      treeGrowth[user.currentStage].water === 0
                        ? 100
                        : (user.water / treeGrowth[user.currentStage].water) *
                          100
                    }%`, // Dynamically set the height
                    width: "100%", // Full width
                    position: "absolute",
                    bottom: 0, // Align the progress from the bottom
                    transition: "height 0.3s ease", // Smooth animation
                  }}
                ></div>
              </div>
              {treeGrowth[user.currentStage].water !== 0 && (
                <span
                  className="absolute text-center font-bold text-black text-md"
                  style={{
                    top: `${50}%`,
                    transform: "translateY(-50%)",
                    width: "100%",
                  }}
                >
                  {user.water} / {treeGrowth[user.currentStage].water}
                </span>
              )}
              {/* Display text inside the progress bar */}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-10/12 h-full py-10">
            <div className="flex w-full relative h-3/4 items-center justify-center">
              <img
                src={treeStages[user.currentStage]}
                alt={`Tree stage ${user.currentStage}`}
                className="max-w-full max-h-full"
              />
            </div>

            <div
              onClick={handleProgress}
              className={`p-2 px-3 bg-blue-600 text-white rounded-2xl cursor-pointer ${
                user.water >= treeGrowth[user.currentStage].water &&
                user.fertilizer >= treeGrowth[user.currentStage].fertilizer
                  ? "opacity-100"
                  : "opacity-40"
              } `}
            >
              Grow Tree
            </div>

            {/* Popup Modal */}
            {isPopupOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
                <div className="bg-white p-5 rounded-lg shadow-lg relative">
                  <h2 className="text-lg font-bold text-center mb-4">
                    Congratulations! Your tree has grown!
                  </h2>

                  <div className="relative h-[50vh] w-[50vw] flex items-center justify-center">
                    <AnimatePresence>
                      <motion.img
                        key={user.currentStage - 1} // Trigger animation for the current frame
                        src={treeStages[user.currentStage - 1]}
                        alt={`Current tree stage ${user.currentStage}`}
                        className="absolute w-1/2 h-full"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }} // Loop animation
                      />
                      <motion.img
                        key={user.currentStage + 1} // Trigger animation for the next frame
                        src={treeStages[user.currentStage]}
                        alt={`Next tree stage ${user.currentStage + 1}`}
                        className="absolute w-1/2 h-full "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }} // Loop animation
                      />
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={closePopup}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="h-full  flex flex-col items-center w-2/12 ">
            <img src={fertilizer} alt="" className="h-8 w-8" />
            <div className="h-3/4 flex items-center justify-center border-2 rounded-t-3xl relative w-full">
              {/* Outer container */}
              <div
                className="w-full   rounded-t-3xl relative overflow-hidden"
                style={{
                  height: "100%",
                }}
              >
                {/* Dynamic progress bar */}
                <div
                  className="w-full"
                  style={{
                    backgroundColor: "green", // Set the color for the progress
                    height: `${
                      treeGrowth[user.currentStage].fertilizer === 0
                        ? 100
                        : (user.fertilizer /
                            treeGrowth[user.currentStage].fertilizer) *
                          100
                    }%`, // Dynamically set the height
                    width: "100%", // Full width
                    position: "absolute",
                    bottom: 0, // Align the progress from the bottom
                    transition: "height 0.3s ease", // Smooth animation
                  }}
                ></div>
              </div>
              {treeGrowth[user.currentStage].fertilizer !== 0 && (
                <span
                  className="absolute text-center font-bold text-black text-md"
                  style={{
                    top: `${50}%`,
                    transform: "translateY(-50%)",
                    width: "100%",
                  }}
                >
                  {user.fertilizer} / {treeGrowth[user.currentStage].fertilizer}
                </span>
              )}
              {/* Display text inside the progress bar */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center h-full gap-3">
        <h1 className="text-2xl text-black">Additional Trophies</h1>

        <div className="p-4 rounded-xl border-2 shadow-md flex flex-col gap-4 w-full h-full overflow-y-auto">
          {Object.entries(additionalTrophies).map(([key, trophy]) => {
            // Current user progress for this trophy
            const counter = (() => {
              switch (key) {
                case "treeStage":
                  return user.treeStage;
                case "progressTree":
                  return user.currentStage;
                case "missionsFinished":
                  return user.totalMissions;
                case "totalBluePoints":
                  return user.totalBlue;
                case "totalYellowPoints":
                  return user.totalYellow;
                case "totalRedPoints":
                  return user.totalRed;
                case "totalMixedPoints":
                  return user.totalBlue + user.totalYellow + user.totalRed;
                case "totalXP":
                  return user.totalXP;
                case "totalWaterBought":
                  return user.totalWaterBought;
                case "totalFertilizerBought":
                  return user.totalFertilizerBought;
                default:
                  return 0;
              }
            })();
            const currentMilestone = trophy.milestones
              .slice()
              .reverse()
              .find((milestone) => counter >= milestone);
            const nextMilestone = trophy.milestones.find(
              (milestone) => milestone > counter
            );
            const nextReward = nextMilestone
              ? trophy.rewards(nextMilestone)
              : null;

            return (
              <div
                key={key}
                className="p-4 rounded-lg border shadow-md flex flex-col gap-2"
              >
                <h2 className="font-bold text-lg capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </h2>
                <p>
                  <span className="font-semibold">Completed:</span>{" "}
                  {currentMilestone || "None"}
                </p>
                <p>
                  <span className="font-semibold">Next Milestone:</span>{" "}
                  {nextMilestone || "None"}
                </p>
                {nextReward && (
                  <div className="flex gap-4">
                    {nextReward.xp && (
                      <div className="flex items-center gap-2">
                        <img src={xp} alt="XP" className="w-6 h-6" />
                        <p>{nextReward.xp}</p>
                      </div>
                    )}
                    {nextReward.blue && (
                      <div className="flex items-center gap-2">
                        <img src={blueIcon} alt="Blue" className="w-6 h-8" />
                        <p>{nextReward.blue}</p>
                      </div>
                    )}
                    {nextReward.yellow && (
                      <div className="flex items-center gap-2">
                        <img
                          src={yellowIcon}
                          alt="Yellow"
                          className="w-6 h-8"
                        />
                        <p>{nextReward.yellow}</p>
                      </div>
                    )}
                    {nextReward.red && (
                      <div className="flex items-center gap-2">
                        <img src={redIcon} alt="Red" className="w-6 h-8" />
                        <p>{nextReward.red}</p>
                      </div>
                    )}
                    {nextReward.water && (
                      <div className="flex items-center gap-2">
                        <img src={water} alt="Water" className="w-6 h-8" />
                        <p>{nextReward.water}</p>
                      </div>
                    )}
                    {nextReward.fertilizer && (
                      <div className="flex items-center gap-2">
                        <img
                          src={fertilizer}
                          alt="Fertilizer"
                          className="w-6 h-8"
                        />
                        <p>{nextReward.fertilizer}</p>
                      </div>
                    )}
                  </div>
                )}
                <p>
                  <span className="font-semibold">Current Count:</span>{" "}
                  {counter} / {nextMilestone || "None"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl text-black">Trophies</h1>
        <div className="p-4 rounded-xl border-2 shadow-md flex flex-col gap-4 w-full  h-full overflow-y-auto">
          {Object.entries(missionRewards).map(([key, mission]) => {
            const counter = missionCounters[key] || 0; // Current counter for this mission
            const currentMilestone = mission.trophyMilestones.find(
              (milestone) => counter >= milestone
            ); // Find the last completed milestone
            const nextMilestone = mission.trophyMilestones.find(
              (milestone) => counter < milestone
            ); // Find the next milestone
            const nextReward = nextMilestone
              ? mission.trophyRewards(nextMilestone)
              : null; // Calculate the next milestone reward

            return (
              <div
                key={key}
                className="p-4 rounded-lg border shadow-md flex flex-col gap-2"
              >
                <h2 className="font-bold text-lg">{key}</h2>
                <p>
                  <span className="font-semibold">Completed:</span>{" "}
                  {currentMilestone || "None"}
                </p>
                <p>
                  <span className="font-semibold">Next Milestone:</span>{" "}
                  {nextMilestone || "None"}
                </p>
                {nextMilestone && (
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <img src={xp} alt="XP" className="w-6 h-6" />
                      <p>{nextReward.xp} </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={blueIcon} alt="Blue" className="w-6 h-8" />
                      <p>{nextReward.blue}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={yellowIcon} alt="Yellow" className="w-6 h-8" />
                      <p>{nextReward.yellow}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={redIcon} alt="Red" className="w-6 h-8" />
                      <p>{nextReward.red}</p>
                    </div>
                  </div>
                )}
                <p>
                  <span className="font-semibold">Current Count:</span>{" "}
                  {counter} / {nextMilestone || "None"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Player;
