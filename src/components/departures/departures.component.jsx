import { useDispatch, useSelector } from "react-redux";
import {
  selectDeparturesMap,
  selectDeparturesIsLoading,
} from "../../sagas/departures/departures.selector";
import "../../index.css";

const Departures = ({ route }) => {
  const { id, name, service } = route;
  console.log(id);
  console.log(name);
  console.log(service);
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
    <div className="route-container" id={id}>
      <span className="emoji">{emoji}</span>
      <span className="name">{name}</span>
      <span className="departing">5:08pm</span>
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
