import React, { useState } from "react";
import { CloseOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { v4 as uuidv4} from "uuid";
import boardSlice from '../redux/boardsSlice';


const AddEditBoardModal = ({ setBoardModalOpen, type }) => {

    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const  [isValid, setIsValid] = useState(true);
    const [newColumns, setNewColumns] = useState(
        [
            {name:'Todo', task:[], id:uuidv4()},
            {name:'In Progress', task:[], id:uuidv4()},
            {name:'Done', task:[], id:uuidv4()}

        ]
    )

    const onChange = (id, newValue) =>{
        setNewColumns((previousState) =>{
            const newState = [...previousState];
            const column = newState.find((col)=>col.id === id)
            column.name = newValue;
            return newState;
        })
    }

    const onDelete = (id) =>{
        setNewColumns((previousState)=> previousState.filter((item)=>item.id !== id))
    }

    const addColumn = () =>{
        setNewColumns([ ...newColumns, { name:"",task:[] ,id:uuidv4()}])
    }

    const validate = () =>{
        setIsValid(false);
        if(!name.trim()){
            return false;
        }

        for(const column of newColumns){
            if(!column.name.trim()){
                return false;
            }
        }
        
        setIsValid(true);
        return true;
    }

    const onSubmit = (type) => {
        setBoardModalOpen(false);
        if(type==='add'){
            dispatch(boardSlice.actions.addBoard({name, newColumns}))
        }else{
            dispatch(boardSlice.actions.editBoard({name, newColumns}))
        }
    }

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
                            <div key={index} className=" flex items-center w-full space-x-2">
                                <input className=" bg-transparent flex-grow px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0"
                                 onChange={(e)=>{
                                    onChange(column.id, e.target.value)
                                 }}
                                 value={column.name}
                                 type="text"/>
                                 <CloseOutline color={'#7f7f7f'} className=" cursor-pointer" onClick={()=>{
                                    onDelete(column.id)
                                 }}/>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                <button className=" w-full items-center hover:opacity-75 dark:text-[#8b5cf6]
                 dark:bg-white text-white mt-2 bg-[#8b5cf6] py-2 rounded-md"
                 onClick={()=>{
                    addColumn()
                 }}>
                    + Add New Column
                </button>

                <button className=" w-full items-center hover:opacity-75
                dark:text-white dark:bg-[#8b5cf6] relative text-white
                 mt-2 bg-[#8b5cf6] py-2 rounded-md"
                 onClick={
                    ()=>{
                        const isValid = validate();
                        if (isValid){
                            onSubmit(type)
                        }
                    }
                 }>
                    {type === 'add'?"Create New Board":'Save Changes'}
                </button>
            </div>

        </div>
    </div>
  );
};

export default AddEditBoardModal;
