import React from 'react';
import './App.css';
import MainContainer from './components/MainContainer.jsx';
import Login from './components/Login.jsx';
// bg-[#dddedd]
function App() {
  return (
    <div className='flex  h-[100%] w-[100%] m-0 p-0 justify-center items-center'>
      <MainContainer /> 
      {/* <Login/> */}
    </div>
  );
}

export default App;
