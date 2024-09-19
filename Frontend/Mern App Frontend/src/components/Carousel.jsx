import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { BACKDROP_IMAGE_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

const Carousel = ({ interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = useSelector((store) => store.movie.backdropImages);

  useEffect(() => {
    if (!slides || slides.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(slideInterval);
  }, [slides, interval]);

  if (!slides) {
    return (
      <div className="h-screen w-full text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10 shimmer"></div>
      </div>
    );
  }
  return (
    <div className="relative w-full h-[50vh] md:h-[70vh] lg:h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides &&
          slides.length > 0 &&
          slides.map((slide, index) => (
            <div key={index} className="w-full h-full flex-shrink-0">
              <img
                src={`${BACKDROP_IMAGE_URL}${slide.backdrop_path}`}
                alt={slide.original_title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </div>

      {slides && slides.length > 0 && (
        <div className="absolute top-10 bottom-10 left-4 right-4 md:left-8 md:right-8 flex flex-col justify-center space-x-2 mb-4">
          <div className="max-w-xl md:max-w-2xl ml-2">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
              {slides[currentIndex].original_title}
            </h1>
            <p className="mt-2 text-sm md:text-lg">
              {slides[currentIndex].release_date.split("-")[0]} |{" "}
              {slides[currentIndex].adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-xs hidden md:block md:text-base lg:text-lg">
              {slides[currentIndex].overview.length > 200
                ? slides[currentIndex].overview + "..."
                : slides[currentIndex].overview}
            </p>
          </div>
          <div className="flex gap-3 md:mt-8 mt-2">
            <Link
              className="flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-white hover:bg-white/80 text-black rounded-md text-xs md:text-sm lg:text-lg"
              to={`/watch/${slides[currentIndex].id}`}
            >
              <FaPlay /> Play Now
            </Link>
            <Link className="flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-gray-500/70 hover:bg-gray-500 text-white rounded-md text-xs md:text-sm lg:text-lg">
              <IoIosInformationCircleOutline size={20} md={25} /> More Info
            </Link>
          </div>
        </div>
      )}

      {/* Navigation dots */}
      {slides && slides.length > 0 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 md:mb-4 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
