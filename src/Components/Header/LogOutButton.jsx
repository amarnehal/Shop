import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/features/authSlice";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth.userData);

  const handleLogOut = () => {
    authService
      .logOut()
      .then(() => dispatch(logOut()))
      .catch((error) => console.log("error occured at logOut service", error));
  };
  return (
    <>
      <button
        className="duration-200 text-orange-700 border-b border-gray-100 hover:bg-gray-50 hover:text-stone-400"
        onClick={handleLogOut}
      >
        LogOut -{name}
      </button>
    </>
  );
};

export default LogOutButton;
