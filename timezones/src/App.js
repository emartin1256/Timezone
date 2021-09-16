import React, { useState, useEffect } from "react";
import "./App.css";
import { BiSearch } from "react-icons/all";
import axios from "axios";
import Card from "./card";

function App() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState(data);
  const getData = async () => {
    let response = await axios.get("http://localhost:4041/zones");
    setData(response.data);
    setFilteredData(response.data);
    return response.data;
  };
  useEffect(() => {
    let data = getData();
    setData(data);
  }, []);
  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    var countries = JSON.parse(
      JSON.stringify(data, function (a, b) {
        return typeof b === "string" ? b.toLowerCase() : b;
      })
    );
    let result = [];
    console.log(value);
    result = countries.filter((data) => {
      return data.Name.search(value) !== -1;
    });

    // console.log(result);
    setFilteredData(result);
    console.log(filteredData);
  };
  return (
    <div className="container">
      <div className="searchbar">
        <BiSearch className="icon" />
        <input
          className="search"
          placeholder="Search"
          onChange={(event) => handleSearch(event)}
        />
      </div>
      {Object.keys(filteredData)
        .slice(0, 3)
        .map((column, index) => {
          return (
            <Card
              key={index}
              column={column}
              timezones={filteredData[column]}
            />
          );
        })}
    </div>
  );
}

export default App;
