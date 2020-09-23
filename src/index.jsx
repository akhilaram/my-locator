import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MenuSlice } from "./components/MenuList/Menu.slice";
import { SelectedMenuSlice } from "./components/MenuList/SelectedMenu.slice";
import { LocatorSlice } from "./components/LocatorMap/Locator.slice";

const rootReducer = combineReducers({
  menu: MenuSlice.reducer,
  selectedmenu: SelectedMenuSlice.reducer,
  locator: LocatorSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger, thunk],
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
