import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import URI from "urijs";
import swagger from "swagger-client";
import * as CryptoJS from "crypto-js";

import { createAction } from "./utils/reducer.utils";
import { fetchRoutesStart } from "./sagas/routes/routes.action";
import { fetchDeparturesStart } from "./sagas/departures/departures.action";
import { fetchDisruptionsStart } from "./sagas/disruptions/disruptions.action";
import Departures from "./components/departures/departures.component";
import { store } from "./sagas/store";

import logo from "./logo.svg";
import "./App.css";

export let route = [1, 2, 3];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoutesStart());
    dispatch(fetchDeparturesStart());
  }, [dispatch]);

  let route = "";
  let service = "";
  let departures = [];
  let timer = 0;
  let timeout = 30000;

  function setTime() {
    timeout = document.getElementById("timeout").value * 1000;
    timer = 0;
    console.log(timeout);
    // timerReset();
  }

  function reset() {
    route = "";
    service = "";
    departures = [];
    timer = 0;
    // getRoute();
  }

  // const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
  reset();

  // setInterval(function () {
  //   timer++;
  //   console.log(timer);
  // }, 1000);

  // setInterval(function () {
  //   reset();
  // }, timeout);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <Departures /> */}
        <p>
          {route}: {service} {timer}
        </p>
        <p>
          {departures.map((departure) => {
            return departures;
          })}
        </p>
        <select
          onChange={(e) => setTime(e.target.value)}
          defaultValue={3}
          id="timeout"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
