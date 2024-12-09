import React, { useState, useEffect } from "react";
import { LogoutBtn, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { menu } from "../../assets/images";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const navItems = [
    { name: "Home", to: "/", active: true },
    { name: "Login", to: "/login", active: !authStatus },
    { name: "Signup", to: "/signup", active: !authStatus },
    { name: "All Posts", to: "/all-posts", active: authStatus },
    { name: "Add Post", to: "/add-post", active: authStatus },
  ];

  const closeNav = () => setNav(false);

  // Prevent body scroll when navbar is open
  useEffect(() => {
    if (nav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [nav]);

  return (
    <header className="z-50 fixed top-0 w-full min-h-[3rem] md:h-[5rem] shadow px-6 py-2 bg-gray-500">
      {/* Desktop Navbar */}
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
                  className="inline-block border-b-[1px] border-gray-400 text-xl font-semibold px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
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

      {/* Mobile Navbar */}
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
          <img src={menu} alt="Menu Icon" className="w-full h-full object-cover" />
        </div>

        {/* Navbar Items */}
        {nav && (
          <>
            {/* Overlay with Blur Effect */}
            <div
              className="fixed top-0 left-0 w-full h-full z-20"
              onClick={closeNav}
            ></div>

            {/* Navbar List */}
            <ul
              className={`flex flex-col z-30 transition-all duration-300 ease-in-out transform ${
                nav ? "translate-y-0 opacity-100" : "translate-y-[-500%] opacity-0"
              } absolute py-3 top-[3.5rem] border-t-[1px] border-black bg-gray-500 left-0 w-full gap-3 justify-center items-center`}
            >
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.to);
                        closeNav();
                      }}
                      className="inline-block text-lg font-medium border-b-[1px] border-gray-400 px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
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
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
