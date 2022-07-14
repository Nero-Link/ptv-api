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
import TrainRoutes from "./components/routes/train-routes.component";
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
  // let timer = 0;
  let timeout = 10000;

  // function setTime() {
  //   timeout = document.getElementById("timeout").value * 1000;
  //   timer = 0;
  //   console.log(timeout);
  //   // timerReset();
  // }

  // function reset() {
  //   route = "";
  //   service = "";
  //   departures = [];
  //   timer = 0;
  //   // getRoute();
  // }

  // const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
  // reset();
  let [timer, setTimer] = useState(0);

  function countdown() {
    setInterval(function () {
      setTimer(timer + 1);
      console.log(timer);
    }, timeout);
  }

  function clearTimer(newTime) {
    timeout = newTime;
    timer = 0;
    clearInterval(countdown);
    console.log(timeout);
    countdown();
  }

  // countdown();

  // setInterval(function () {
  //   reset();
  // }, timeout);

  useEffect(() => {
    document.title = `You refreshed ${timer} times`;
  });

  // store.subscribe(() => {
  //   console.log("state\n", store.getState());
  //   // debugger;
  // });

  return (
    <div className="App">
      <header className="App-header">
        <TrainRoutes />
        <button onClick={() => setTimer(timer + 1)}>Refresh</button>
        <p>
          {route}: {service} {timer}
        </p>
        <p>
          {departures.map((departure) => {
            return departures;
          })}
        </p>
        <select
          onChange={(e) => {
            clearTimer(e.target.value);
          }}
          defaultValue={3000}
          id="timeout"
        >
          <option value="1000">1</option>
          <option value="2000">2</option>
          <option value="3000">3</option>
          <option value="4000">4</option>
          <option value="5000">5</option>
        </select>
      </header>
    </div>
  );
};

export default App;
