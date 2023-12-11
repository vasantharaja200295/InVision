import React, { useState } from "react";
import { AddCircle, Clipboard, Moon, Sunny } from "react-ionicons";
import { useSelector } from "react-redux";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDarkMode";

function HeaderDropDown({ setDropDown, setBoardModalOpen }) {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setdarkMode] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setdarkMode(checked);
  };

  const boards = useSelector((state) => state.board);
  return (
    <div
      className=" py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setDropDown(false);
      }}
    >
      <div className=" bg-white dark:bg-gray-900 shadow-md w-full py-4 rounded-xl ">
        <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
          All Boards ({boards?.length})
        </h3>

        <div>
          {boards.map((item, index) => {
            return (
              <div
                className={` flex items-baseline space-x-2 px-5 py-4 ${
                  item.isActive &&
                  "bg-violet-500 rounded-r-full text-white mr-8"
                }`}
                key={index}
              >
                <div className=" flex items-center space-x-2">
                  <Clipboard
                    color={`${item.isActive || darkMode ? "#fff" : "#000"}`}
                  />
                  <p className={` text-lg font-medium dark:text-gray-100 `}>
                    {item.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className=" flex  items-baseline space-x-2 text-violet-600 px-5 py-4"
          onClick={() => {setBoardModalOpen(true)
            setDropDown(false)}}
        >
          <div className=" flex items-center space-x-2">
            <AddCircle color={"#7c3aed"} />
            <p className=" text-lg font-regular">Create New Board</p>
          </div>
        </div>

        <div
          className=" mx-2 p-4 space-x-2 bg-slate-100 dark:bg-gray-800
         flex justify-center items-center rounded-lg"
        >
          <Sunny color={`${darkMode ? "#fff" : "#000"}`} />
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            className={` ${
              darkMode ? " bg-slate-700" : " bg-slate-300"
            } relative inline-flex h-6 w-12 items-center rounded-full px-1`}
          >
            <span
              className={`${
                darkMode ? "translate-x-6" : "traslate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`}
            ></span>
          </Switch>
          <Moon color={`${darkMode ? "#fff" : "#000"}`} />
        </div>
      </div>
    </div>
  );
}

export default HeaderDropDown;
