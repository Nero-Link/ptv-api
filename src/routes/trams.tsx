import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchRoutesStart } from "../sagas/trams/routes/routes.action";
import { fetchDeparturesStart } from "../sagas/trams/departures/departures.action";
import { fetchDisruptionsStart } from "../sagas/trams/disruptions/disruptions.action";
import TramRoutes from "../components/routes/tram-routes.component";
import Spinner from "../components/spinner/spinner.component";
import { timeout, tick } from "./config";

const tram = require("../../public/svg/tram.svg");

let isLoading = true;

const Trams = () => {
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
        <a href="/trams">{<img src={tram.default.src} className="logo" />}</a>
        <h2 className="title">
          Trams From The <strong>COLLAB HUB</strong>
        </h2>
      </div>
      <header className="App-header">
        {isLoading ? <Spinner /> : <TramRoutes />}
      </header>
    </div>
  );
};

export default Trams;
