import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import {FiLogOut} from 'react-icons/fi';
const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom);
  const showToast = useShowToast();
  const host = "https://talktime-erub.onrender.com";
  const handleLogout = async () =>{
    try{
      const res = await fetch("/api/users/logout",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
      })
      const data = await res.json();
      if(data.error){
        showToast("Error" , data.error);
        return ;
      }
      localStorage.removeItem('user-vibeup');
      setUser(null);
    }catch(err){
      showToast("Error", err);
      console.log(err);
    }
  }
  return (
    <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout}>
      <FiLogOut size={20}/>
		</Button>
  )
}

export default LogoutButton