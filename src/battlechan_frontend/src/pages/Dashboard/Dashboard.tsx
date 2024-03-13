import React from 'react'
import Navbar from "../../components/Dashboard-Components/navbar/Navbar"
import Body from "../../components/Dashboard-Components/body/body"
import RecentPost from "../../components/Dashboard-Components/Recent-Posts/RecentPosts"
function Dashboard() {
  return (
   <div className='  '>
      <Navbar/>
      <Body/>
    <RecentPost/>

   </div>
  )
}

export default Dashboard
