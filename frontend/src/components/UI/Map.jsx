import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

setDefaults({
  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  language: "en", 
  region: "il", 
});

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: 230,
};

const defaultCenter = {
  lat: 32.109333,
  lng: 34.855499,
};

export default function Map({ eventLocation }) {
   const [center, setCenter] = useState(defaultCenter);

   useEffect(() => {
     const fetchCenter = async () => {
       try {
         const response = await fromAddress(eventLocation);
         const { results } = response;
         const { lat, lng } = results[0].geometry.location;
         setCenter({ lat, lng });
       } catch (error) {
         console.error("Error fetching center:", error);
       }
     };
     fetchCenter();
   }, [eventLocation]);

  const actualCenter = center || defaultCenter;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={actualCenter}
      >
        <Marker position={actualCenter} />
      </GoogleMap>
    </div>
  );
}
