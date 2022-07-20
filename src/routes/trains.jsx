import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRoutesStart } from "../sagas/trains/routes/routes.action";
import { fetchDeparturesStart } from "../sagas/trains/departures/departures.action";
import { fetchDisruptionsStart } from "../sagas/trains/disruptions/disruptions.action";
import TrainRoutes from "../components/routes/train-routes.component";
import Spinner from "../components/spinner/spinner.component";
import { timeout, tick } from "./config";

import train from "../images/train.svg";
import tram from "../images/tram.svg";
import "../App.css";

let isLoading = true;

const Trains = () => {
  const dispatch = useDispatch();
  let [fetch, setFetch] = useState(0);
  let [refresh, setRefresh] = useState(0);
  let [timer, setTimer] = useState(0);

  useEffect(() => {
    dispatch(fetchRoutesStart());
    dispatch(fetchDeparturesStart());
    dispatch(fetchDisruptionsStart());
    setFetch(fetch + 1);
  }, [dispatch, refresh]);

  useEffect(() => {
    const interval = setInterval(() => {
      isLoading = false;
      setTimer((timer) => timer + 1);
    }, tick);
    return () => clearInterval(interval);
  }, []);

  if (timer > timeout) {
    isLoading = true;
    setRefresh(refresh + 1);
    setTimer(0);
  }

  return (
    <div className="App">
      <div className="banner">
        <a href="/trains">
          {<img src={train} height="50px" className="logo" />}
        </a>
        <h2 className="title">Southern Cross Train Departures</h2>
        <a href="/trams">{<img src={tram} height="50px" className="logo" />}</a>
      </div>
      <header className="App-header">
        {isLoading ? <Spinner /> : <TrainRoutes />}
      </header>
    </div>
  );
};

export default Trains;
