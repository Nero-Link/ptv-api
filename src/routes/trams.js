import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRoutesStart } from "../sagas/trams/routes/routes.action";
import { fetchDeparturesStart } from "../sagas/trams/departures/departures.action";
import { fetchDisruptionsStart } from "../sagas/trams/disruptions/disruptions.action";
import TramRoutes from "../components/routes/tram-routes.component";
import Spinner from "../components/spinner/spinner.component";

import train from "../images/train.svg";
import tram from "../images/tram.svg";
import "../App.css";

export let route = { latitude: "-37.816774", longitude: "144.955539" };
export let stops = [2091, 2087, 2496, 2497, 3106];
let isLoading = true;

const Trams = () => {
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
        <h2 className="title">Nearby Tram Departures</h2>
        <a href="/trams">{<img src={tram} height="50px" className="logo" />}</a>
      </div>
      <header className="App-header">
        {isLoading ? <Spinner /> : <TramRoutes />}
      </header>
    </div>
  );
};

export default Trams;
