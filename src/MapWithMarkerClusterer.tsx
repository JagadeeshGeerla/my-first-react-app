import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = { lat: -28.024, lng: 140.887 };
const position = { lat: -29.024, lng: 150.887 };

const iconDefault = {
  url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  scaledSize: { width: 28, height: 28 },
  labelOrigin: { x: 25, y: 20 },
};
const locations = [
  { lat: -31.56391, lng: 147.154312 },
  { lat: -33.718234, lng: 150.363181 },
  { lat: -33.727111, lng: 150.371124 },
  { lat: -33.848588, lng: 151.209834 },
  { lat: -33.851702, lng: 151.216968 },
  { lat: -34.671264, lng: 150.863657 },
  { lat: -35.304724, lng: 148.662905 },
  { lat: -36.817685, lng: 175.699196 },
  { lat: -36.828611, lng: 175.790222 },
  { lat: -37.75, lng: 145.116667 },
  { lat: -37.759859, lng: 145.128708 },
  { lat: -37.765015, lng: 145.133858 },
  { lat: -37.770104, lng: 145.143299 },
  { lat: -37.7737, lng: 145.145187 },
  { lat: -37.774785, lng: 145.137978 },
  { lat: -37.819616, lng: 144.968119 },
  { lat: -38.330766, lng: 144.695692 },
  { lat: -39.927193, lng: 175.053218 },
  { lat: -41.330162, lng: 174.865694 },
  { lat: -42.734358, lng: 147.439506 },
  { lat: -42.734358, lng: 147.501315 },
  { lat: -42.735258, lng: 147.438 },
  { lat: -43.999792, lng: 170.463352 },
];
const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};
const options = {
  imagePath:
    "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
};

function createKey(location) {
  return location.lat + location.lng;
}

const MapWithMarkerClusterer = () => {
  const [count, setCount] = useState(1);
  const [infoWindowPosition, setInfoWindowPosition] = useState({
    lat: 0,
    lng: 0,
  });

  const InfoView = (lat: number, lng: number) => {
    console.log("info :");
    setInfoWindowPosition({ lat: lat, lng: lng });
    return;
  };

  // useEffect(() => {
  //   var ann = document.getElementsByClassName("gm-style-iw-a");
  //   console.log("fdsfd " + ann.length);
  //   ann.style;
  // });

  return (
    <>
      <button onClick={() => setCount(0)}>Click me</button>
      <LoadScript googleMapsApiKey="AIzaSyDY54lf33Hs8JevY36HXpFqqn2kMfHcz4c">
        <GoogleMap
          id="marker-example"
          mapContainerStyle={mapContainerStyle}
          zoom={3}
          center={center}
        >
          {!count && (
            <>
              <MarkerClusterer options={options}>
                {(clusterer) =>
                  locations.map((location) => (
                    <Marker
                      key={createKey(location)}
                      position={location}
                      clusterer={clusterer}
                      icon={iconDefault}
                      label="10"
                    />
                  ))
                }
              </MarkerClusterer>
              {infoWindowPosition.lat && (
                <InfoWindow
                  position={{
                    lat: infoWindowPosition.lat,
                    lng: infoWindowPosition.lng,
                  }}
                  onCloseClick={() => {
                    setInfoWindowPosition({ lat: 0, lng: 0 });
                  }}
                >
                  <div style={divStyle}>
                    <h1>InfoWindow</h1>
                  </div>
                </InfoWindow>
              )}
            </>
          )}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapWithMarkerClusterer;
