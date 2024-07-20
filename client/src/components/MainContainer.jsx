import React from 'react';
import SideBar from './Sidebar';
import ChatArea from './ChatArea';
import Welcome from './Welcome';
import CreateGroups from './CreateGroups';
import UserGroups from './UserGroups';
function MainContainer() {
  return (
    <div className='flex rounded-[20px] shadow-[0_10px_20px_rgba(240,_46,_170,_0.7) bg-[#F0F8FF]  h-[90vh] w-[90vw] text-black'>
      <SideBar/>
      {/* <ChatArea/> */}
      {/* <CreateGroups/> */}
      <UserGroups/>
    </div>
  )
}

export default MainContainer;
