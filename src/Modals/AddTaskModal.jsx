import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CloseOutline } from "react-ionicons";
import { useDispatch, useSelector } from "react-redux";
import boardSlice from "../redux/boardsSlice";

const AddTaskModal = ({ setAddEditTask, type, device, taskIndex, prevColIndex = 0 }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [description, setDescription] = useState("");

  const board = useSelector((state) => state.board).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    {
      title: "",
      isCompleted: false,
      id: uuidv4(),
    },
  ]);

  const onDelete = (id) => {
    setSubtasks((previousState) =>
      previousState.filter((item) => item.id !== id)
    );
  };

  const addSubTask = () => {
    setSubtasks([...subtasks, { title: "", task: [], id: uuidv4() }]);
  };

  const onChange = (id, newValue) => {
    setSubtasks((previousState) => {
      const newState = [...previousState];
      const subtask = newState.find((task) => task.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }

    for (const subtask of subtasks) {
      if (!subtask.title.trim()) {
        return false;
      }
    }

    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    setAddEditTask(false);
    if (type === "add") {
      dispatch(
        boardSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(boardSlice.actions.editTask({
        title,
        description,
        subtasks,
        status,
        taskIndex,
        prevColIndex,
        newColIndex,
      }));
    }
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  return (
    <div
      className={
        device === "mobile"
          ? " py-6 px-6 pb-40 fixed overflow-y-scroll w-full left-0 flex right-0 bottom-[-100vh] top-0 bg-[#00000080] "
          : " py-6 px-6 pb-40 fixed overflow-y-scroll flex right-0 bottom-0 top-0 bg-[#00000080] w-full "
      }
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setAddEditTask(false);
      }}
    >
      <div
        className=" scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white dark:bg-slate-900
           text-black dark:text-white font-bold shadow-md max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <h3 className=" text-lg">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        <div className=" mt-8 flex flex-col space-y-1">
          <label className=" text-sm dark:text-white text-gray-500">
            Task Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" bg-transparent px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0"
            placeholder="e.g Water the plants"
          />
        </div>

        <div className=" mt-8 flex flex-col space-y-2">
          <label className=" text-sm dark:text-white text-gray-500">
            Task Description
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" bg-transparent min-h-[200px] px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0"
            placeholder="e.g Water the plants"
          />
        </div>

        <div className=" mt-8 flex flex-col space-y-2">
          <label htmlFor="" className=" text-sm dark:text-white text-gray-500">
            Subtasks
          </label>
          {subtasks.map((subtask, index) => (
            <div key={index} className=" flex items-center w-full space-x-2">
              <input
                type="text"
                value={subtask.title}
                placeholder="e.g Do the Homework"
                className=" bg-transparent w-full px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0"
                onChange={(e) => {
                  onChange(subtask.id, e.target.value);
                }}
              />
              <CloseOutline
                color={"#7f7f7f"}
                className=" cursor-pointer"
                onClick={() => {
                  onDelete(subtask.id);
                }}
              />
            </div>
          ))}
          <button
            className=" w-full items-center hover:opacity-75 dark:text-[#8b5cf6]
                 dark:bg-white text-white mt-2 bg-[#8b5cf6] py-2 rounded-md"
            onClick={() => {
              addSubTask();
            }}
          >
            + Add New SubTask
          </button>
        </div>

        <div className=" mt-8 flex flex-col space-y-2">
          <label htmlFor="" className=" text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select className=" bg-transparent w-full px-4 py-2 rounded-md text-sm font-normal border border-gray-600 outline-none focus:outline-[#8b5cf6] outline-offset-0">
            {columns.map((item, index) => {
              return (
                <option
                  className=" bg-transparent text-gray-600"
                  value={status}
                  onChange={(e) => onChangeStatus(e)}
                  key={index}
                >
                  {item.name}
                </option>
              );
            })}
          </select>

          <button
            onClick={() => {
              const isValid = validate();
              if (isValid) {
                onSubmit(type);
              }
            }}
            className=" w-full items-center hover:opacity-75
                dark:text-white dark:bg-[#8b5cf6] relative text-white
                 mt-2 bg-[#8b5cf6] py-2 rounded-md"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
