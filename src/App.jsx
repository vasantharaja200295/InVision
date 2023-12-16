import React, {useState} from 'react'
import Header from './Components/Header'
import Center from './Components/Center'

const App = () => {
    const [boardModalOpen, setBoardModalOpen] = useState(false)
  return (
    <div className=' h-[100vh] w-[100%]'>
     <Header boardModalOpen={boardModalOpen} setBoardModalOpen={setBoardModalOpen}/>
     <Center/>
    </div>
  )
}

export default App