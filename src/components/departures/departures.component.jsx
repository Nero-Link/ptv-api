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
import { fetchDisruptionsStart } from "../../sagas/disruptions/disruptions.action";
import { timer } from "../../App";
import "../../index.css";
import { store } from "../../sagas/store";

export let departuresMap;
const Departures = ({ route }) => {
  const dispatch = useDispatch();

  const { id, name, service } = route;
  departuresMap = useSelector(selectDeparturesMap);
  const isLoading = useSelector(selectDeparturesIsLoading);
  const [departures, setDepartures] = useState(departuresMap[route]);
  // const disruptionsMap = useSelector(selectDisruptionsMap);
  // // const isLoading = useSelector(selectDeparturesIsLoading);
  // const [disruptions, setDisruptions] = useState(disruptionsMap[route]);
  let departuresArray = [];

  const objectLoop = () => {
    if (departuresArray.length === 0) {
      departuresArray = Object.entries(departuresMap);
      departuresArray.forEach((departures) => {
        if (departures[1].route_id === id)
          // departuresArray.push(departures);
          console.log(departures[1].departures.disruptions);
        // console.log(departures[1]);
      });
    }
    // console.log(departuresMap);
    return;
  };

  useEffect(() => {
    setDepartures(departuresMap[route]);
  }, [departures, departuresMap, store]);

  // useEffect(() => {
  //   setDisruptions(disruptionsMap[route]);
  // }, [disruptions, disruptionsMap, store]);

  useEffect(() => {
    dispatch(fetchDisruptionsStart());
  }, [departures, departuresMap]);

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
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            {objectLoop(departuresMap)}
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
          {isLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              {objectLoop(departuresMap)}
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
        Parliament Station: Pedestrian access and car park changes from June
        2022 to July 2023
      </span>
    </div>
  );
};

export default Departures;
