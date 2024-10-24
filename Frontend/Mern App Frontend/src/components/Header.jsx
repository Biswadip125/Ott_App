import React, { useState } from "react";
import { API_END_POINT, BACKEND_IMAGE_URL } from "../utils/constant";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { setMenuToggle, setProfileMenuToggle } from "../redux/movieSlice";

import { LuLogOut } from "react-icons/lu";
import { setSearchMovieDetails } from "../redux/searchSlice";
import { IoMenu } from "react-icons/io5";

const Header = ({ buttonName, link }) => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);
  const location = useLocation();
  const hideNavOnRoutes = ["/register", "/"];
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(setSearchMovieDetails({ searchInputValue: "", movies: "" }));
  };

  const profileMenuToggleHandler = () => {
    dispatch(setProfileMenuToggle());
  };

  const menuToggleHandler = () => {
    dispatch(setMenuToggle());
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setUser(null));
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <header
        id="header"
        className="fixed w-full z-30 transition duration-300 ease-in-out bg-gradient-to-b from-black to-transpare"
      >
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="md:h-8 h-5"
            />
          </div>
          {user && !hideNavOnRoutes.includes(location.pathname) && (
            <nav className="md:flex hidden space-x-8">
              <a
                href="/browse"
                class="text-gray-300 hover:text-white transition"
              >
                Movies
              </a>
              <a
                href="/tvshows"
                className="text-gray-300 hover:text-white transition"
              >
                TV Shows
              </a>
              <a
                href="/watchlist"
                className="text-gray-300 hover:text-white transition"
              >
                Watchlist
              </a>
            </nav>
          )}
          {user && !hideNavOnRoutes.includes(location.pathname) ? (
            <div className="flex items-center space-x-4 ">
              <Link onClick={toggleHandler} to={"/search"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-300 hover:text-white transition"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M17 11a6 6 0 10-12 0 6 6 0 0012 0z"
                  />
                </svg>
              </Link>

              <button className="border-4 border-transparent hover:border-gray-500/50 rounded-full">
                <img
                  src={`${BACKEND_IMAGE_URL}/${user.picture}`}
                  alt="Profile"
                  className="h-8 w-8 rounded-full "
                  onClick={profileMenuToggleHandler}
                />
              </button>
              <button onClick={logoutHandler} className="md:block hidden">
                <LuLogOut size={25} color={"white"} />
              </button>
              <button className="block md:hidden " onClick={menuToggleHandler}>
                <IoMenu size={25} color={"white"} />
              </button>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <Link
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 md:w-[104px] w-20 md:h-[12] font-medium rounded-lg md:text-lg md:px-3 px-2 md:py-2.5 py-2 text-sm   dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 cursor-pointer text-center"
                to={link}
              >
                {buttonName}
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
