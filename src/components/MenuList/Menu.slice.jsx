import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const MenuSlice = createSlice({
  name: "MenuList",
  initialState,
  reducers: {
    CountryListSlice: (state, action) => {
      let countryData = { countryList: action.payload };
      return {
        ...state,
        ...countryData,
      };
    },
    CityListSlice: (state, action) => {
      let cityData = { cityList: action.payload };
      return {
        ...state,
        ...cityData,
      };
    },
    CompanyListSlice: (state, action) => {
      let companyData = { companyList: action.payload };
      return {
        ...state,
        ...companyData,
      };
    },
  },
});
export const {
  CountryListSlice,
  CityListSlice,
  CompanyListSlice,
} = MenuSlice.actions;
export { MenuSlice };
