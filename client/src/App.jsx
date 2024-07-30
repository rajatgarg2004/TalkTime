import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx';
import {Routes,Route} from 'react-router-dom';
import Welcome from './components/Welcome.jsx';
import ChatArea from './components/ChatArea.jsx';
import UserGroups from './components/UserGroups.jsx';
function App() {
  return (
    <div className='flex  h-[100%] w-[100%] m-0 p-0 justify-center items-center'>
      <MainContainer /> 
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='app' element={<MainContainer/>}>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path='chat' element={<ChatArea/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path='welcome' element={<Welcome/>}/>
        </Route>
      </Routes>
      {/* <Login/> */}
    </div>
  );
}

export default App;
