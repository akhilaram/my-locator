import React, { useEffect } from "react";
import List from "./components/MenuList/List";
import LocatorMap from "./components/LocatorMap/LocatorMap";
import "./App.css";
import client from "./clients.json";
import { useDispatch } from "react-redux";
import {
  CityListSlice,
  CompanyListSlice,
  CountryListSlice,
} from "./components/MenuList/Menu.slice";
import {
  SelectedCountrySlice,
  SelectedCitySlice,
  SelectedCompanySlice,
} from "./components/MenuList/SelectedMenu.slice";
import { SelectedLocatorSlice } from "./components/LocatorMap/Locator.slice";

function App() {
  const clientArray = client.Customers;
  const dispatch = useDispatch();

  useEffect(() => {
    let cityArray = clientArray.reduce(function (r, a) {
      r[a.City] = r[a.City] || [];
      if (!Object.values(r[a.City]).includes(a.CompanyName)) {
        r[a.City].push(a.CompanyName);
        //  r[a.City].sort();
      }
      return r;
    }, Object.create(null));

    let companyArray = clientArray.reduce(function (r, a) {
      r[a.CompanyName] = r[a.CompanyName] || [];
      r[a.CompanyName].push(a);
      return r;
    }, Object.create(null));

    let countryArray = clientArray.reduce(function (r, a) {
      r[a.Country] = r[a.Country] || [];
      if (!Object.values(r[a.Country]).includes(a.City)) {
        r[a.Country].push(a.City);
        r[a.Country].sort((a, b) => cityArray[b].length - cityArray[a].length);
        //sorting city depending on no.of companies - highest first
      }
      return r;
    }, Object.create(null));

    //sorting country array - no.of cities highest first
    let selectedCountryArray = Object.keys(countryArray).sort(
      (a, b) => countryArray[b].length - countryArray[a].length
    );

    let selectedCityArray = Object.values(
      countryArray[selectedCountryArray[0]]
    );
    let selectedCompanyArray = Object.values(cityArray[selectedCityArray[0]]);

    // import and load the data from json file and maintain in state for reusability
    dispatch(CountryListSlice(countryArray));
    dispatch(CityListSlice(cityArray));
    dispatch(CompanyListSlice(companyArray));

    //Intially load First values
    dispatch(SelectedCountrySlice(selectedCountryArray));
    dispatch(SelectedCitySlice(selectedCityArray));
    dispatch(SelectedCompanySlice(selectedCompanyArray));
    dispatch(SelectedLocatorSlice(companyArray[selectedCompanyArray[0]][0]));
  }, [dispatch, clientArray]);

  return (
    <div className="App">
      <List />
      <LocatorMap />
    </div>
  );
}

export default App;
