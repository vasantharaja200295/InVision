import React, { useState } from "react";
import logo from "../assets/react.svg";
import { ChevronDown, ChevronUp, EllipsisVertical } from "react-ionicons";
import HeaderDropDown from "./HeaderDropDown";

const Header = () => {
  const [openDropDown, setDropDown] = useState(false);

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-slate-900 z-50 right-0">
      <header className=" flex justify-between dark:text-white items-center">
        <div className=" flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className=" h-6 w-6" />
          <h3 className=" hidden md:inline-block font-bold font-sans md:text-2xl">
            InVision
          </h3>
          <div className=" flex items-center bg-purple-200 px-2 py-1 rounded-md">
            <h3 className=" truncate max-w-[200px] md:text:2xl text-xl font-bold md:ml-20 font-sans ">
              Board Name
            </h3>
            <div className=" w-auto h-[100%] flex items-center ml-2 mt-0.5 cursor-pointer md:hidden " onClick={()=>{setDropDown(state => !state)}}>
                {
                    openDropDown? <ChevronUp/>:<ChevronDown/>
                }
            </div>
          </div>
        </div>

        <div className=" flex space-x-4 items-center md:space-x-6">
            <button className=" button"> + Add New Task</button>
            <button className=" button rounded-full md:hidden">+</button>
            <EllipsisVertical className=" cursor-pointer"/>
        </div>

      </header>

      {
        openDropDown && <HeaderDropDown setDropDown={setDropDown}/>
      }

    </div>
  );
};

export default Header;
