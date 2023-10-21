import React, { useState } from "react";
import YouTube from "react-youtube";

const MovieDetail = ({ item, trailerUrl }) => {
  const [cond, setCon] = useState(false);
  const [detail, setDetail] = useState(false);
  const opts = {
    height: "530",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div className="w-full h-screen text-white">
      {!cond ? (
        <div className="w-full h-full">
          <div className="absolute w-full h-full"></div>
          {item && (
            <img
              className="w-full h-full object-cover"
              src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
              alt={item?.title}
            />
          )}
          <div className="absolute w-full top-[40%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-bold">{item?.title}</h1>
            <div className="my-4">
              <button
                className="border bg-gray-300 text-black border-gray-300 py-2 px-5 font-bold"
                onClick={() => {
                  setCon(true);
                }}
              >
                Play
              </button>
              <button
                className="border text-white border-gray-300 py-2 px-5 ml-4 font-bold"
                onClick={() => setDetail(!detail)}
              >
                View Detail
              </button>
            </div>
            <p className="text-white text-sm font-semibold">
              Released: {item?.release_date}
            </p>
            {detail && (
              <div>
                <p className="w-full h-full flex justify-start items-start limited-width-1 text-white font-semibold">
                  {truncateString(item?.overview, 150)}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="pt-16">
          <div className="flex justify-end items-center">
            <YouTube className="" videoId={trailerUrl} opts={opts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
