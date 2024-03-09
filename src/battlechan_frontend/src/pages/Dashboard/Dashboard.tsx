import React from 'react'
import { Link } from 'react-router-dom'
function Dashboard() {
  return (
   <div className='  '>
    <Link to="/"><button className = "bg-blue-400 rounded-md p-3 m-3">Go to Landing Page</button></Link>
    <div  className= ' '>
      BattleChan : Decentralized Discussion Battlefeild
    </div>
   </div>
  )
}

export default Dashboard
