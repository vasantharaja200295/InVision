import React from 'react'

const DeleteModal = ({type, title, handleClick, setDeleteModal}) => {
  return (
    <div className=' fixed right-0 bottom-0 left-0 top-0 px-2 py-4 overflow-scroll  scrollbar-hide z-50 justify-center items-center flex bg-[#00000080]'
    onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setDeleteModal(false);
      }}>
        <div className=' scrollbar-hide overflow-y-scroll max-h-[95vh] my-auto bg-white max-w-md dark:bg-[#2b2c37] text-black dark:text-white w-full px-8 py-8 rounded-xl'>
            <h3 className=' font-bold text-red-500 text-xl'>
                Delete This {type} ?
            </h3>
            {
                type==='task'?(
                    <p className=' text-gray-500 font-semibold tracking-wide text-sm pt-6'>
                        Are you sure you want to delete the "<span className=' font-bold'>{title}</span>" task and its subtasks?<br></br>
                        This action cannot be reversed.
                    </p>
                ):(
                    <p className=' text-gray-500 font-semibold tracking-wide text-sm pt-6'>
                        Are you sure you want to delete the "<span className=' font-bold'>{title}</span>" Board and its columns and tasks?<br></br>
                        This action cannot be reversed.
                    </p>
                )
            }
            <div className=' flex w-full mt-4 items-center justify-center space-x-4 '>
                <button className=' w-full items-center text-white hover:opacity-75 bg-red-500 py-2 rounded-md' onClick={()=>handleClick()}>
                    Delete
                </button>
                <button className=' w-full items-center text-[#635fc7] hover:opacity-75 font-semibold bg-[#635fc71a] py-2 rounded-md' onClick={()=>{setDeleteModal(false)}}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal