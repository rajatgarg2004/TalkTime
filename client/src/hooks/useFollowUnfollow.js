import { useState, useEffect } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const useFollowUnfollow = (user) => {
	const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(false);
	const [updating, setUpdating] = useState(false);
	const showToast = useShowToast();

	useEffect(() => {
		if (user && currentUser) {
			setFollowing(user.followers.includes(currentUser?._id));
		}
	}, [user, currentUser]);

	const handleFollowUnfollow = async () => {
		if (!currentUser) {
			showToast("Error", "Please login to follow", "error");
			return;
		}
		if (updating) return;

		setUpdating(true);
		try {
			const res = await fetch(`http://localhost:5000/api/users/follow/${user._id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				credentials : "include",
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}

			if (following) {
				showToast("Success", `Unfollowed ${user.name}`, "success");
				user.followers = user.followers.filter(id => id !== currentUser?._id); // simulate removing from followers
			} else {
				showToast("Success", `Followed ${user.name}`, "success");
				user.followers.push(currentUser?._id); // simulate adding to followers
			}
			setFollowing(!following);
		} catch (error) {
			showToast("Error", error.message || "Something went wrong", "error");
		} finally {
			setUpdating(false);
		}
	};

	return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
