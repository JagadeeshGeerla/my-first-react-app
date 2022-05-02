import { useEffect } from "react";
import MapPage from "./MapPage.tsx";
import "./styles.css";

// a1950cb1

const API_URL = "http://www.omdbapi.com/?apikey=a1950cb1";
const App = () => {
  // const searchMovies = async (title) => {
  //   const response = await fetch(`${API_URL}&s=${title}`);
  //   const data = await response.json();

  //   console.log(data);
  // };

  // useEffect(() => {
  //   searchMovies("batman");
  // }, []);

  return (
    <>
      <MapPage />
    </>
  );
};

export default App;
