import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import {
  selectDeparturesMap,
  selectDeparturesIsLoading,
} from "../../sagas/departures/departures.selector";
import "../../index.css";

const Departures = ({ route }) => {
  const { id, name, service } = route;
  const departuresMap = useSelector(selectDeparturesMap);
  const isLoading = useSelector(selectDeparturesIsLoading);
  const [departures, setDepartures] = useState(departuresMap[route]);
  let departuresArray = [];

  const objectLoop = () => {
    if (departuresArray.length === 0)
      departuresArray = Object.entries(departuresMap);
    console.log(departuresMap);
    console.log(departuresArray);
    return;
  };

  useEffect(() => {
    setDepartures(departuresMap[route]);
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
      <span className="departing">{objectLoop(departuresMap)}</span>
      <span className="platform">
        Platform{" "}
        <span className="number">
          <br />
          11
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
