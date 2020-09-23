import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { GeoCode } from "./GeoCode";

const containerStyle = {
  width: "50em",
  height: "auto",
};

function LocatorMap() {
  const intialState = [
    {
      lat: 0,
      lng: 0,
    },
  ];
  const company = useSelector((state) => state.locator);
  let [location, setLoction] = useState(intialState);

  useEffect(() => {
    let locdata;
    if (company.City !== undefined) {
      locdata = GeoCode(company.City);

      locdata.then((loc) => {
        if (loc !== undefined) setLoction({ lat: loc[0], lng: loc[1] });
      });
    }
  }, [company]);

  return (
    <>
      {typeof location.lat === "number" && company.CompanyName && (
        <>
          <LoadScript googleMapsApiKey="AIzaSyCIkKCu5HH_82b4l3P956jlLvsVbyVNPDE">
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={13}
              center={location}
            >
              <Marker
                label={{
                  text: company.CompanyName,
                  color: "#d80a00",
                  fontWeight: "bold",
                }}
                key={company.CompanyName}
                position={location}
              />
            </GoogleMap>
          </LoadScript>
        </>
      )}
    </>
  );
}

export default React.memo(LocatorMap);
