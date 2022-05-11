import React from "react";
import { useLoadScript } from "@react-google-maps/api";
//import Map from "./components/map.tsx";
//import MapWithMarkerClusterer from "./MapWithMarkerClusterer";
import MapWithMarkerClusterer from "./MapWithMarkerClusterer.tsx";

const MapPage = () => {
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  //   libraries: ["places"],
  // });

  // if (!isLoaded) {
  //   return <div>Loading...</div>;
  // }

  return <MapWithMarkerClusterer />;
};

export default MapPage;
