import React, { useState } from "react";
import logo from "../assets/react.svg";
import { ChevronDown, ChevronUp, EllipsisVertical } from "react-ionicons";
import HeaderDropDown from "./HeaderDropDown";
import AddEditBoardModal from "../Modals/AddEditBoardModal";
import { useSelector } from "react-redux";
import AddTaskModal from "../Modals/AddTaskModal";

const Header = ({ boardModalOpen, setBoardModalOpen }) => {
  const [openDropDown, setDropDown] = useState(false);
  const [openAddEditTask, setAddEditTask] = useState(false);
  const [boardType, setBoardType] = useState("add");

  const boards = useSelector((state) => state.board);
  const board = boards.find((board) => board.isActive);

  return (
    <div className=" p-4 fixed left-0 bg-white dark:bg-slate-900 z-50 right-0">
      <header className=" flex justify-between dark:text-white items-center">
        <div className=" flex items-center space-x-2 md:space-x-4">
          <img src={logo} alt="logo" className=" h-6 w-6" />
          <h3 className=" hidden md:inline-block font-bold font-sans md:text-2xl">
            InVision
          </h3>
          <div className=" flex items-center px-2 py-1 rounded-md">
            <h3 className=" truncate max-w-[200px] md:text:2xl text-xl font-bold md:ml-20 font-sans ">
              {board.name}
            </h3>
            <div
              className=" w-auto h-[100%] flex items-center ml-2 mt-0.5 cursor-pointer md:hidden"
              onClick={() => {
                setDropDown((state) => !state);
              }}
            >
              {openDropDown ? (
                <ChevronUp color={"#8b5cf6"} />
              ) : (
                <ChevronDown color={"#8b5cf6"} />
              )}
            </div>
          </div>
        </div>

        <div className=" flex space-x-4 items-center md:space-x-6">
          <button className=" hidden md:block button"> + Add New Task</button>
          <button className=" button rounded-full md:hidden"
            onClick={()=>{
                setAddEditTask(state => !state)
            }}
          >+</button>
          <EllipsisVertical className=" cursor-pointer" color={"#8b5cf6"} />
        </div>
      </header>

      {openDropDown && (
        <HeaderDropDown
          setDropDown={setDropDown}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {boardModalOpen && (
        <AddEditBoardModal
          type={boardType}
          setBoardModalOpen={setBoardModalOpen}
        />
      )}
      {
        openAddEditTask&& <AddTaskModal setAddEditTask={setAddEditTask} type={'add'}/>
      }
    </div>
  );
};

export default Header;
