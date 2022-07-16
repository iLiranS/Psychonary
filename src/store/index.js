import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import data from "./data";

const store = configureStore({reducer:{theme:themeSlice,data}});

export default store;