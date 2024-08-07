import React from 'react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from './useShowToast';

const useLogout = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();
    const host = import.meta.env.VITE_HOST_ADDRESS;
    const handleLogout = async () => {
        try {
            const res = await fetch(host+"/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error);
                return;
            }
            localStorage.removeItem('user-vibeup');
            setUser(null);
        } catch (err) {
            showToast("Error", err);
        }
    }
    return handleLogout;
}
export default useLogout