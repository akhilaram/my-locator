import Geocode from "react-geocode";

// Google Maps Geocoding API for purposes of quota management.
Geocode.setApiKey("AIzaSyCIkKCu5HH_82b4l3P956jlLvsVbyVNPDE");

Geocode.setLanguage("en");

Geocode.enableDebug();

// Get latidude & longitude from address.
export const GeoCode = (city) =>
  Geocode.fromAddress(city).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      let loc = [];
      loc.push(lat);
      loc.push(lng);
      return loc;
    },
    (error) => {
      console.error(error);
    }
  );
