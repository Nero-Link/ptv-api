import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRoutesStart } from "./sagas/routes/routes.action";
import { fetchDeparturesStart } from "./sagas/departures/departures.action";
import { fetchDisruptionsStart } from "./sagas/disruptions/disruptions.action";
import TrainRoutes from "./components/routes/train-routes.component";
import Spinner from "./components/spinner/spinner.component";

import logo from "./train.svg";
import "./App.css";

import { store } from "./sagas/store";

export let route = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17];
let isLoading = true;
const App = () => {
  const dispatch = useDispatch();
  let [fetch, setFetch] = useState(0);
  let [refresh, setRefresh] = useState(0);
  let [timer, setTimer] = useState(0);
  let timeout = 150;
  let tick = 5000;

  useEffect(() => {
    dispatch(fetchRoutesStart());
    dispatch(fetchDeparturesStart());
    dispatch(fetchDisruptionsStart());
    setFetch(fetch + 1);
  }, [dispatch, refresh]);

  useEffect(() => countdown(), []);

  if (timer > timeout) {
    isLoading = true;
    setRefresh(refresh + 1);
    setTimer(0);
  }

  function countdown() {
    setInterval(function () {
      isLoading = false;
      setTimer(timer + 1);
    }, tick);
  }

  return (
    <div className="App">
      <div className="banner">
        {<img src={logo} height="50px" className="logo" />}
        <h2 className="title">Southern Cross Train Departures</h2>
        {<img src={logo} height="50px" className="logo" />}
      </div>
      <header className="App-header">
        {isLoading ? <Spinner /> : <TrainRoutes />}
      </header>
    </div>
  );
};

export default App;
