import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectedCitySlice, SelectedCompanySlice } from "./SelectedMenu.slice";
import { SelectedLocatorSlice } from "../LocatorMap/Locator.slice";

const List = () => {
  const selectedItemStyle = {
    backgroundColor: "#1168b3",
    borderRadius: "5px",
    color: "#fff",
  };
  const intialState = {
    countryList: "",
    cityList: "",
    companyList: "",
  };
  let menu = useSelector((state) => state.selectedmenu);
  let keys = menu && Object.keys(menu);
  let values = menu && Object.values(menu);
  let countryMenu = useSelector((state) => state.menu.countryList);
  let cityMenu = useSelector((state) => state.menu.cityList);
  let companyMenu = useSelector((state) => state.menu.companyList);
  let [selectedItem, setSelectedItem] = useState(false);

  let [state, setState] = useState(intialState);
  const dispatch = useDispatch();

  const handleSelected = (listName, value) => {
    if (listName === "countryList") {
      let selectedCityArray = Object.values(countryMenu[value]);
      let selectedCompanyArray = Object.values(cityMenu[selectedCityArray[0]]);

      dispatch(SelectedCitySlice(selectedCityArray));
      dispatch(SelectedCompanySlice(selectedCompanyArray));
      dispatch(SelectedLocatorSlice(companyMenu[selectedCompanyArray[0]][0]));
      setState({
        ...state,
        countryList: value,
        cityList: selectedCityArray[0],
        companyList: selectedCompanyArray[0],
      });
      setSelectedItem(true);
    } else if (listName === "cityList") {
      let selectedCompanyArray = Object.values(cityMenu[value]);

      dispatch(SelectedCompanySlice(selectedCompanyArray));
      dispatch(SelectedLocatorSlice(companyMenu[selectedCompanyArray[0]][0]));
      if (selectedItem)
        setState({
          ...state,
          cityList: value,
          companyList: selectedCompanyArray[0],
        });
      else
        setState({
          countryList: menu.countryList[0],
          cityList: value,
          companyList: selectedCompanyArray[0],
        });
      setSelectedItem(true);
    } else if (listName === "companyList") {
      if (selectedItem)
        setState({
          ...state,
          companyList: value,
        });
      else
        setState({
          countryList: menu.countryList[0],
          cityList: menu.cityList[0],
          companyList: value,
        });
      setSelectedItem(true);
      dispatch(SelectedLocatorSlice(companyMenu[value][0]));
    }
  };
  return (
    <div className="dropdown">
      {values.map((menulist, index) => (
        <div className="MenuList" key={`menu ${index}`}>
          <div key={keys[index]} className="title pointerCursor">
            {" "}
            {keys[index].toUpperCase()}{" "}
          </div>
          <div className="menu pointerCursor" key={index}>
            {menulist &&
              menulist.map((item, i) => {
                return (
                  <div
                    className="option"
                    style={
                      (selectedItem && state[keys[index]] === item) ||
                      (selectedItem === false && i === 0)
                        ? selectedItemStyle
                        : {}
                    }
                    onClick={() => handleSelected(keys[index], item)}
                    key={item}
                  >
                    {item}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};
export default List;
