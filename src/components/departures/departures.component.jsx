import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../spinner/spinner.component";
import {
  selectDeparturesMap,
  selectDeparturesIsLoading,
} from "../../sagas/departures/departures.selector";
import {
  selectDisruptionsMap,
  selectDisruptionsIsLoading,
} from "../../sagas/disruptions/disruptions.selector";
import "../../index.css";
import { store } from "../../sagas/store";

const Departures = ({ route }) => {
  const dispatch = useDispatch();

  const { id, name, service } = route;
  const departuresMap = useSelector(selectDeparturesMap);
  const departuresIsLoading = useSelector(selectDeparturesIsLoading);
  const [departures, setDepartures] = useState(departuresMap[route]);
  const disruptionsMap = useSelector(selectDisruptionsMap);
  const disruptionsIsLoading = useSelector(selectDeparturesIsLoading);
  const [disruptions, setDisruptions] = useState(disruptionsMap[route]);
  let departuresArray = [];
  let disruptionsArray = [];

  const departuresLoop = () => {
    if (departuresArray.length === 0)
      departuresArray = Object.entries(departuresMap);
    return;
  };

  const disruptionsLoop = () => {
    if (disruptionsArray.length === 0)
      disruptionsArray = Object.entries(disruptionsMap);
    return;
  };

  useEffect(() => {
    setDepartures(departuresMap[route]);
  }, [departures, departuresMap, store]);

  useEffect(() => {
    setDisruptions(disruptionsMap[route]);
  }, [disruptions, disruptionsMap, store]);

  let emoji = "🟢";
  if (service === "Good Service") {
    emoji = "🟢";
  } else if (service === "Minor Delays") {
    emoji = "🟡";
  } else if (service === "Major Delays") {
    emoji = "🔴";
  } else if (service === "Planned Works") {
    emoji = "🟠";
  }
  return (
    <div className="departure-container" id={id}>
      <span className="emoji">{emoji}</span>
      <span className="name">{name}</span>
      <span className="departing">
        {departuresIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            {departuresLoop(departuresMap)}
            {departuresArray.length > 0 &&
              departuresArray.map((departure) => {
                if (
                  departure[1].route_id === id &&
                  departure[1].departures.count === 1
                ) {
                  return departure[1].departures.time;
                }
              })}
          </Fragment>
        )}
      </span>
      <span className="platform">
        Platform{" "}
        <span className="number">
          <br />
          {departuresIsLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              {departuresLoop(departuresMap)}
              {departuresArray.length > 0 &&
                departuresArray.map((departure) => {
                  if (
                    departure[1].route_id === id &&
                    departure[1].departures.count === 1 &&
                    departure[1].departures.platform !== null
                  ) {
                    return departure[1].departures.platform;
                  }
                })}
            </Fragment>
          )}
        </span>
      </span>
      <span className="disruptions">
        {disruptionsIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            {disruptionsLoop(disruptionsMap)}
            {disruptionsArray.length > 0 &&
              disruptionsArray.map((disruption) => {
                if (
                  disruption[1].route_id === id &&
                  disruption[1].disruptions.count === 1
                ) {
                  return disruption[1].disruptions.title;
                }
                console.log(disruption);
              })}
          </Fragment>
        )}
      </span>
    </div>
  );
};

export default Departures;
