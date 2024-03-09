import React from 'react'
import { Link } from 'react-router-dom'
function Dashboard() {
  return (
   <div>
    Dashboard page 
    <Link to="/"><button>Go to Landing Page</button></Link>
   </div>
  )
}

export default Dashboard
