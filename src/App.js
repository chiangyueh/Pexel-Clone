import React,{useState} from "react";
import "./App.css";
import ShowPage from "./views/ShowPage";
import SearchBar from "./views/SearchBar";
import {Routes, Route } from "react-router-dom";
import { getFeaturedPics, getSearchPics } from "./api/axios";

const App = () => {
  return (
    <div>
        <SearchBar></SearchBar>
        <Routes>
            <Route
              path="/"
              element={<ShowPage getPexelPics={getFeaturedPics}></ShowPage>}
            ></Route>
            <Route
              path="/search/:keyword"
              element={<ShowPage getPexelPics={getSearchPics} ></ShowPage>}
            ></Route>
        </Routes>
    </div>
  );
};

export default App;
