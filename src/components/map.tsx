import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places.tsx";
import Distance from "./distance.tsx";
import Data from "./data.json";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const newData = Data.map((d) => {
    return { JobId: d.jobId, Lat: d.latitude, Lng: d.longitude };
  });
  console.log(`Datajag : ${newData.length}`);

  const clusterStyles = [
    {
      textColor: "black",
      url: process.env.PUBLIC_URL + "j1.png",
      height: 53,
      width: 52,
      //anchorText: [20, 0],
      fontWeight: "bold",
    },
    {
      textColor: "black",
      url: process.env.PUBLIC_URL + "j2.png",
      height: 56,
      width: 55,
      //  anchorText: [20, -1],
      fontWeight: "bold",
    },
    {
      textColor: "black",
      url: process.env.PUBLIC_URL + "j3.png",
      height: 66,
      width: 65,
      anchorText: [-5, -6],
      fontWeight: "bold",
    },
    {
      textColor: "black",
      url: process.env.PUBLIC_URL + "j4.png",
      height: 78,
      width: 77,
      anchorText: [-12, -12],
      fontWeight: "bold",
    },
    {
      textColor: "black",
      url: process.env.PUBLIC_URL + "j5.png",
      height: 90,
      width: 89,
      anchorText: [-17, -18],
      fontWeight: "bold",
    },
  ];
  const mcOptions = {
    styles: clusterStyles,
  };
  const [office, setOffice] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "d1a2b4c3db0ed296",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const fetchDirections = (house: LatLngLiteral) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current.panTo(position);
          }}
        />
        {!office && <p>Enter the address of your office</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
      <div className="map">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              ></Marker>

              <MarkerClusterer options={mcOptions} calculator={calc}>
                {(clusterer) =>
                  Data.map((d) => (
                    <Marker
                      key={d.latitude + d.longitude + d.jobId}
                      position={{ lat: d.latitude, lng: d.longitude }}
                      clusterer={clusterer}
                      onClick={() => fetchDirections(d)}
                    />
                  ))
                }
              </MarkerClusterer>
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default Map;

var calc = function (markers, numStyles) {
  var index = 0,
    total = 0;

  total = markers.length;
  //Change cluster icon based on number of jobs under cluster
  while (total !== 0) {
    total = parseInt(total / 5, 10); //Second parameter 10 means decimal format.
    index++;
  }
  index = Math.min(index, numStyles);
  return { text: markers.length, index: index };
};
