import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const SelectedMenuSlice = createSlice({
  name: "SelectedMenuList",
  initialState,
  reducers: {
    SelectedCountrySlice: (state, action) => {
      let countryData = { countryList: action.payload };
      return {
        ...state,
        ...countryData,
      };
    },
    SelectedCitySlice: (state, action) => {
      let cityData = { cityList: action.payload };
      return {
        ...state,
        ...cityData,
      };
    },
    SelectedCompanySlice: (state, action) => {
      let companyData = { companyList: action.payload };
      return {
        ...state,
        ...companyData,
      };
    },
  },
});
export const {
  SelectedCountrySlice,
  SelectedCitySlice,
  SelectedCompanySlice,
} = SelectedMenuSlice.actions;
export { SelectedMenuSlice };
