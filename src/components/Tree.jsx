import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import tree0 from "../assets/tree/0.png";
import tree1 from "../assets/tree/0-1.png";
import tree2 from "../assets/tree/0-2.png";
import tree3 from "../assets/tree/1.png";
import tree4 from "../assets/tree/2.png";
import tree5 from "../assets/tree/3.png";
import tree6 from "../assets/tree/4.png";
import tree7 from "../assets/tree/5.png";
import tree8 from "../assets/tree/6.png";
import tree9 from "../assets/tree/7.png";
import tree10 from "../assets/tree/8.png";
import tree11 from "../assets/tree/9.png";
import tree12 from "../assets/tree/10.png";
import tree13 from "../assets/tree/11.png";
import tree14 from "../assets/tree/12.png";
import tree15 from "../assets/tree/13.png";
import tree16 from "../assets/tree/14.png";
import tree17 from "../assets/tree/15.png";
import tree18 from "../assets/tree/16.png";
import tree19 from "../assets/tree/17.png";
import tree20 from "../assets/tree/18.png";
import tree21 from "../assets/tree/19.png";
import tree22 from "../assets/tree/20.png";
import tree23 from "../assets/tree/21.png";
import tree24 from "../assets/tree/22.png";
import tree25 from "../assets/tree/23.png";
import tree26 from "../assets/tree/24.png";
import tree27 from "../assets/tree/25.png";
import tree28 from "../assets/tree/26.png";
import tree29 from "../assets/tree/27.png";
import tree30 from "../assets/tree/28.png";
import tree31 from "../assets/tree/29.png";
import tree32 from "../assets/tree/30.png";

import waterIcon from "../assets/resources/ماء.png";
import FertilizerIcon from "../assets/resources/سماد.png";

function Tree({ currentStage }) {
  const treeGrowth = [
    { frame: 1, water: 0, fertilizer: 0 },
    { frame: 2, water: 1, fertilizer: 1 },
    { frame: 3, water: 1, fertilizer: 1 },
    { frame: 4, water: 1, fertilizer: 1 },
    { frame: 5, water: 1, fertilizer: 1 },
    { frame: 6, water: 5, fertilizer: 5 },
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

  const treeStages = [
    tree0,
    tree1,
    tree2,
    tree3,
    tree4,
    tree5,
    tree6,
    tree7,
    tree8,
    tree9,
    tree10,
    tree11,
    tree12,
    tree13,
    tree14,
    tree15,
    tree16,
    tree17,
    tree18,
    tree19,
    tree20,
    tree21,
    tree22,
    tree23,
    tree24,
    tree25,
    tree26,
    tree27,
    tree28,
    tree29,
    tree30,
    tree31,
    tree32,
  ];

  const [counter, setCounter] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleProgress = () => {
    if (counter < treeStages.length - 1) {
      setIsPopupOpen(true); // Open popup
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCounter((prev) => prev + 1); // Update to the next tree stage
  };

  return (
    <div className="flex w-full h-3/4">
      <div className="h-full  flex flex-col items-center w-1/6 ">
        <img src={waterIcon} alt="" className="h-8 w-8" />
        <div className="h-full flex items-center justify-center border-2 p-2">
          3 / 4
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 w-4/6 h-full py-10">
        <div className="flex w-full relative h-3/4 items-center justify-center">
          <img
            src={treeStages[currentStage]}
            alt={`Tree stage ${currentStage}`}
            className="max-w-full max-h-full"
          />
        </div>

        <div
          onClick={handleProgress}
          className="p-2 px-3 bg-blue-600 text-white rounded-2xl cursor-pointer"
        >
          Progress
        </div>

        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-lg relative">
              <h2 className="text-lg font-bold text-center mb-4">
                Congratulations! Your tree has grown!
              </h2>

              <div className="relative h-[50vh] w-[50vw] flex items-center justify-center">
                <AnimatePresence>
                  <motion.img
                    key={currentStage} // Trigger animation for the current frame
                    src={treeStages[currentStage]}
                    alt={`Current tree stage ${currentStage}`}
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
                    key={currentStage + 1} // Trigger animation for the next frame
                    src={treeStages[currentStage + 1]}
                    alt={`Next tree stage ${currentStage + 1}`}
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
    </div>
  );
}

export default Tree;
