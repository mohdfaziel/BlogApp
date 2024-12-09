import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      window.location.reload();
    });
  };
  return (
    <div
      className="inline-bock border-b-[1px] border-gray-400 text-xl cursor-pointer font-semibold px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </div> 
  );
}

export default Logout;
