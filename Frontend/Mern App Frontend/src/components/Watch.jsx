import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BACKDROP_IMAGE_URL,
  MOVIE_DETAILS_URL,
  MOVIE_VIDEO_URL,
  options,
} from "../utils/constant";
import axios from "axios";
import Header from "./Header";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import ReactPlayer from "react-player";
import MovieList from "./Movielist";
import { formatReleaseDate } from "../utils/dateFunction";
import WatchSkeleton from "./WatchSkeleton";
import { useSelector } from "react-redux";
import Menu from "./Menu";

const Watch = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [similarContent, setSimilarContent] = useState(null);

  const menuToggle = useSelector((store) => store.movie.menuToggle);

  const increaseIndex = () => {
    if (currentTrailerIdx < trailers.length - 1) {
      setCurrentTrailerIdx((currentTrailerIdx) => currentTrailerIdx + 1);
    }
  };

  const decreaseIndex = () => {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx((currentTrailerIdx) => currentTrailerIdx - 1);
    }
  };

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(
          `${MOVIE_VIDEO_URL}${id}/videos?language=en-US`,
          options
        );
        setTrailers(res.data.results);
      } catch (err) {
        console.log(err);
        setTrailers([]);
      } finally {
        setLoading(false);
      }
    };

    getTrailers();
  }, [id]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const res = await axios.get(
          `${MOVIE_DETAILS_URL}${id}?language=en-US`,
          options
        );
        setContent(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [id]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(
          `${MOVIE_DETAILS_URL}${id}/similar?language=en-US`,
          options
        );
        setSimilarContent(res.data.results);
      } catch (err) {
        console.log(err);
        setSimilarContent([]);
      } finally {
        setLoading(false);
      }
    };

    getSimilarContent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchSkeleton />
        {menuToggle && <Menu />}
      </div>
    );
  }

  if (!content) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-5xl font-bold text-center">Content Not Found</h2>
        </div>
        {menuToggle && <Menu />}
      </div>
    );
  }

  return (
    <div className="bg-black h-auto w-full text-white relative">
      <Header />
      <div className=" px-24 md:px-52 py-[85px] w-full h-full ">
        {/*Video Player */}

        {trailers.length > 0 && (
          <ReactPlayer
            controls={true}
            width={"100%"}
            height={"75vh"}
            className="mx-auto overflow-hidden rounded-lg"
            url={`https://youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
          />
        )}
        {trailers.length === 0 && (
          <h2 className="text-xl text-center mt-5">
            No trailers available for{" "}
            <span className="font-bold text-red-600">{content?.title}</span>
          </h2>
        )}

        {/*Movie Details*/}
        <div className="flex flex-col mt-32 md:flex-row gap-20 items-center justify-between">
          <div>
            <h2 className="text-5xl text-white font-bold text-balance">
              {content?.title}
            </h2>
            <p className="mt-2 text-lg">
              {formatReleaseDate(content?.release_date)} |{" "}
              {content?.adult ? (
                <span className="text-red-600">!8+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-2 text-lg">{content?.overview}</p>
          </div>
          <img
            className="max-h-[600px] rounded-md"
            src={BACKDROP_IMAGE_URL + content?.poster_path}
          ></img>
        </div>

        {/*Similar Content Slider*/}
        <div className=" mt-5">
          {similarContent?.length > 0 && (
            <MovieList title={"Similar Movies"} movies={similarContent} />
          )}
        </div>
      </div>

      {/*Navigation  Buttons*/}
      <div className="absolute top-32 flex justify-between w-full px-28">
        <button
          className={`w-11 h-11 bg-gray-500/70 hover:bg-gray-500 rounded-full flex items-center justify-center  ${
            currentTrailerIdx === 0
              ? "opacity-50 cursor-not-allowed "
              : "cursor-pointer"
          }`}
          disabled={currentTrailerIdx === 0}
          onClick={decreaseIndex}
        >
          <GrPrevious size={20} />
        </button>
        <button
          className={`w-11 h-11 bg-gray-500/70 hover:bg-gray-500 rounded-full flex items-center justify-center ${
            currentTrailerIdx === trailers.length - 1
              ? "opacity-50 cursor-not-allowed "
              : "cursor-pointer"
          }`}
          disabled={currentTrailerIdx === trailers.length - 1}
          onClick={increaseIndex}
        >
          <GrNext size={20} />
        </button>
      </div>
      {menuToggle && <Menu />}
    </div>
  );
};

export default Watch;
