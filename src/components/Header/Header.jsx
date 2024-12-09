import React, { useState } from "react";
import { LogoutBtn, Logo, Container } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { menu } from "../../assets/images";
function Header() {
  //this gives true if user is login else false
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const navItems = [
    {
      name: "Home",
      to: "/",
      active: true,
    },
    {
      name: "Login",
      to: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      to: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      to: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      to: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="z-30 fixed top-0 w-full min-h-[3rem] md:h-[5rem] shadow px-6 py-2 bg-gray-500">
      <nav className="hidden md:flex w-full items-center justify-start">
        <div className="logo mr-4">
          <Link to="/">
            <Logo width="w-[60px]" />
          </Link>
        </div>
        <ul className="flex w-full gap-9 justify-center items-center">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.to)}
                  className="inline-bock border-b-[1px] border-gray-400 text-xl font-semibold px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
      {/* Phone */}
      <nav className="flex md:hidden w-full justify-between items-center">
        <div className="logo">
          <Link to="/">
            <Logo width="w-[40px]" />
          </Link>
        </div>
        <div
          onClick={() => setNav((prev) => !prev)}
          className="menu hover:scale-105 transition-all cursor-pointer flex justify-center items-center w-[2rem] h-[2rem]"
        >
          <img src={menu} className="w-full h-full object-cover" />
        </div>
        <ul
          className={`flex flex-col z-10 transition-transform duration-300 ease-in-out transform ${
            nav ? "translate-y-0" : "translate-y-[-500%]"
          } absolute py-3 top-[3.5rem] border-t-[1px] border-black bg-gray-500 left-0 w-full gap-3 justify-center items-center`}
        >
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.to)}
                  className="inline-bock text-lg font-medium border-b-[1px] border-gray-400 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
