import React, { useCallback, useEffect, useState } from "react";
import { API_END_POINT, Banner_URL } from "../utils/constant";
import { Link } from "react-router-dom";

import { IoMdAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { setWatchlist } from "../redux/movieSlice.js";

const MovieCard = ({ movie }) => {
  if (!movie.poster_path) {
    return;
  }

  const watchlist = useSelector((store) => store.movie.watchlist);

  const dispatch = useDispatch();

  const [showAddtoWatchList, setShowAddToWatchList] = useState(false);

  const fetchWatchlist = async (dispatch) => {
    try {
      const res = await axios.get(`${API_END_POINT}/watchlist`, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        console.log(res);
        dispatch(setWatchlist(res.data.watchlist));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAddToWatchList = async () => {
    try {
      const res = await axios.post(
        `${API_END_POINT}/addtowatchlist`,
        {
          id: movie.id,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchWatchlist(dispatch);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const res = await axios.post(
        `${API_END_POINT}/deletefromwatchlist`,
        {
          id: movie.id,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchWatchlist(dispatch);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div>
        <div
          className="w-48 rounded-md overflow-hidden  mx-2 relative"
          onMouseEnter={() => setShowAddToWatchList(true)}
          onMouseLeave={() => setShowAddToWatchList(false)}
        >
          <Link to={`/watch/${movie.id}`} className="group">
            <img
              src={`${Banner_URL}${movie.poster_path}`}
              alt="movie-banner"
              className="transition-transfrom duration-300 ease-in-out group-hover:scale-125"
            ></img>
          </Link>
          <div
            className={`${
              showAddtoWatchList ? "flex" : "hidden"
            } absolute bottom-2 right-2 bg-gray-500/70 hover:bg-gray-500 h-8 w-8  items-center justify-center rounded-full`}
          >
            {watchlist && watchlist.includes(movie.id) ? (
              <button
                onClick={() => {
                  handleRemoveFromWatchlist();
                }}
              >
                <TiDeleteOutline size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  handleAddToWatchList();
                }}
              >
                <IoMdAdd size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
