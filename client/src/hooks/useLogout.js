import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from './useShowToast';

const useLogout = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();
            console.log(data);
            if (data.error) {
                showToast("Error", data.error);
                return;
            }
            localStorage.removeItem('user-vibeup');
            setUser(null);
        } catch (err) {
            showToast("Error", err);
            console.log(err);
        }
    }
    return handleLogout;
}
export default useLogout