import React, { useState } from "react";
import { v4 as uuidv4} from "uuid";

const AddEditBoardModal = ({ setBoardModalOpen, type }) => {

    const [name, setName] = useState("");
    const [newColumns, setNewColumns] = useState(
        [
            {name:'Todo', task:[], id:uuidv4()},
            {name:'In Progress', task:[], id:uuidv4()},
            {name:'Done', task:[], id:uuidv4()}

        ]
    )
  return (
    <div
      className=" fixed right-0 left-0 top-0 bottom-0 scrollbar-hide px-2 py-4 overflow-scroll z-50
        justify-center items-center flex bg-[#00000080]"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setBoardModalOpen(false);
      }}
    >
        <div
            className=" scrollbar-hide overflow-y-scroll max-h-[95vh] bg-white dark:bg-slate-900 text-black dark:text-white font-bold shadow-md
             max-w-md mx-auto w-full px-8 py-8 rounded-xl"
        >
            <h3 className=" text-lg">
                {type==='edit'?'Edit': 'Add New'} Board
            </h3>

            <div className=" mt-8 flex flex-col space-y-3">
                <label htmlFor="" className=" text-sm font-medium dark:text-white text-gray-500">Board Name</label>
                <input className=" bg-transparent px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0"
                placeholder="e.g Web Design"
                onChange={(e)=>{
                    setName(e.target.value)}}
                id="board-name-input"
                />
            </div>

            <div 
            className=" mt-8 flex flex-col space-y-3">
                <label
                    className=" text-sm font-medium dark:text-white text-gray-500"
                >Board Columns</label>
                {
                    newColumns.map((column, index)=>{
                        return(
                            <div key={index} className=" flex items-center w-full">
                                <input className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0"
                                 value={column.name}
                                 type="text"/>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    </div>
  );
};

export default AddEditBoardModal;
