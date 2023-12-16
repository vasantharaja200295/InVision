import React from "react";

const ElipsisMenu = ({ type, setOpenDeleteModal, setOpenEditModal }) => {
  return (
    <div 
      className={
        type === "Boards"
          ? "absolute top-16 right-5"
          : " absolute top-6 right-4"
      }
    >
      <div className=" w-40 text-sm z-50 font-medium shadow-md bg-white dark:bg-gray-800 space-y-4 py-5 px-4 rounded-lg h-auto pr-12">
        <p onClick={()=>setOpenEditModal()} className=" cursor-pointer dark:text-gray-400 text-gray-700">
            Edit {type}
        </p>
        <p onClick={()=>setOpenDeleteModal()} className=" cursor-pointer text-red-500">
            Delete {type}
        </p>
      </div>
    </div>
  );
};

export default ElipsisMenu;
