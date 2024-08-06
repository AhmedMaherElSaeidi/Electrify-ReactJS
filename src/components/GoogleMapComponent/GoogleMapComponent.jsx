import React from "react";
import { GOOGLE_MAP_KEY } from "../../services/enviroment";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GMapComponent = ({ onLocationSelect }) => {
  const initialLoc = {
    lat: 30.033333,
    lng: 31.233334,
  };
  const [markerPosition, setMarkerPosition] = React.useState(initialLoc);

  const onClick = React.useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationSelect(lat, lng);
    },
    [onLocationSelect]
  );

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "500px",
      }}
      center={initialLoc}
      onClick={onClick}
      zoom={10}
    >
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

const GoogleMapComponent = ({ onLocationSelect }) => (
  <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
    <GMapComponent onLocationSelect={onLocationSelect} />
  </LoadScript>
);

export default GoogleMapComponent;
