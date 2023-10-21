import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Requests";

const Home = () => {
  return (
    <div>
      <Main />
      <div className="pt-2 pb-2"></div>
      <Row rowID="1" title="Trending" fetchURL={requests.fetchTrending} />
      <Row rowID="2" title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row
        rowID="3"
        title="Action Movies"
        fetchURL={requests.fetchActionMovies}
      />
      <Row
        rowID="4"
        title="Comedy Movies"
        fetchURL={requests.fetchComedyMovies}
      />
      <Row
        rowID="5"
        title="Horror Movies"
        fetchURL={requests.fetchHorrorMovies}
      />
      <Row
        rowID="6"
        title="Romance Movies"
        fetchURL={requests.fetchRomanceMovies}
      />
      <Row
        rowID="7"
        title="Documentaries"
        fetchURL={requests.fetchDocumentaries}
      />
    </div>
  );
};

export default Home;
