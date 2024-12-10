import React from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/authSlice";
import toast from "react-hot-toast";
function Logout() {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    toast.promise(
      logoutHandler(),
      {
        loading: "Logging out...",
        success: "Successfully logged out!",
        error: "Logout failed. Please try again.",
      }
    );
  };
  return (
    <div
      className="inline-block border-b-[1px] border-gray-400 text-lg md:text-xl md:font-semibold cursor-pointer font-medium px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}

export default Logout;
