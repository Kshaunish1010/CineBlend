import React, { useState } from "react";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
import { AiFillCloseCircle } from "react-icons/ai";
const MovieCard = ({ movie }) => {
  const posterUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  const [trailerUrl, setTrailerUrl] = useState("");
  const [cond, setCon] = useState(false);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  const handleClick = async () => {
    setCon(!cond);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="bg-white rounded-xl shadow-md transition transform hover:scale-90">
      {!cond ? (
        <div onClick={handleClick}>
          <img src={posterUrl} alt={movie.title} className="w-full h-auto" />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_date}</p>
            <p className="text-gray-700 mt-2">
              {truncateString(movie.overview, 150)}
            </p>
            <div className="flex justify-between mt-4">
              <p className="text-blue-500">{movie.vote_average} / 10</p>
              <p className="text-gray-500">{movie.vote_count} votes</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="pt-16">
            <div className="flex justify-end items-center">
              <div
                className="cursor-pointer p-2"
                onClick={() => {
                  setCon(!cond);
                }}
              >
                <AiFillCloseCircle className="text-red-700 w-8 h-8" />
              </div>
            </div>
            <YouTube className="" videoId={trailerUrl} opts={opts} />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
