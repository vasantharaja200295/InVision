import React from 'react'
import { useSelector } from 'react-redux'

function HeaderDropDown({setDropDown}) {


    const boards = useSelector((state)=>state.boards);
    console.log(boards)

  return (
    <div
        className=' py-10 px-6 absolute left-0 right-0 bottom-[-100vh] top-16 bg-[#00000080]' 
        onClick={(e)=>{
            if(e.target !== e.currentTarget){
                return
            }
            setDropDown(false)
        }}
    >
        <div className=' bg-white dark:bg-gray-900 shadow-md w-full py-4 rounded-xl '>
            <h3 className=' dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 '>All Boards</h3>

            <div>

            </div>
        </div>
    </div>
  )
}

export default HeaderDropDown