import React from 'react'
import Navbar from "../../components/Dashboard-Components/navbar/Navbar"
import Body from "../../components/Dashboard-Components/body/Body"
import RecentPost from "../../components/Dashboard-Components/Recent-Posts/RecentPosts"
function Dashboard() {
  return (
   <div className='  '>
      <Navbar/>
      <Body/>
    <RecentPost darkColor='dark' lightColor='light'/>

   </div>
  )
}

export default Dashboard
