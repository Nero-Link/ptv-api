import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Spinner from "../spinner/spinner.component";
import {
  selectDeparturesMap,
  selectDeparturesIsLoading,
} from "../../sagas/trains/departures/departures.selector";
import {
  selectDisruptionsMap,
  selectDisruptionsIsLoading,
} from "../../sagas/trains/disruptions/disruptions.selector";

const TrainDepartures = ({ route }) => {
  const dispatch = useDispatch();

  const { id, name, service } = route;
  const departuresMap = useSelector(selectDeparturesMap);
  const departuresIsLoading = useSelector(selectDeparturesIsLoading);
  const [departures, setDepartures] = useState(departuresMap[route]);
  const disruptionsMap = useSelector(selectDisruptionsMap);
  const disruptionsIsLoading = useSelector(selectDisruptionsIsLoading);
  const [disruptions, setDisruptions] = useState(disruptionsMap[route]);
  let departuresArray = [];
  let disruptionsArray = [];
  let remaining = 0;
  let hour = false;
  let timerColour = "green";

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

  const compareTimes = (departure) => {
    const currTime = new Date();
    const departTime = departure[1].departures.fullTime;
    const distance = departTime.getTime() - currTime.getTime();
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (minutes > 15) {
      timerColour = "green";
    } else if (minutes < 15 && minutes > 10) {
      timerColour = "orange";
    } else if (minutes <= 10) {
      timerColour = "red";
    }
    if (currTime > departTime) return "Tomorrow";
    else if (hours > 0) {
      hour = true;
      return hours;
    } else if (currTime < departTime) return minutes;
  };

  useEffect(() => {
    setDepartures(departuresMap[route]);
  }, [departures, departuresMap]);

  useEffect(() => {
    setDisruptions(disruptionsMap[route]);
  }, [disruptions, disruptionsMap]);

  let colour = "white";
  if (service === "Good Service") {
    colour = "white";
  } else if (service === "Minor Delays") {
    colour = "yellow";
  } else if (service === "Major Delays") {
    colour = "red";
  } else if (service === "Planned Works") {
    colour = "orange";
  }

  return (
    <div className="departure-container" id={id} style={{ color: colour }}>
      <span className="name">{name}</span>
      <span className="departing">
        {departuresIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            {departuresLoop(departuresMap)}
            {departuresArray.length > 0 &&
              departuresArray.map((departure) => {
                if (departure[1].route_id === id) {
                  if (departure[1].departures.count === 3)
                    return `${departure[1].departures.time}`;
                  else return `${departure[1].departures.time} | `;
                }
              })}
          </Fragment>
        )}
      </span>
      {departuresArray.length > 0 &&
        departuresArray.map((departure) => {
          if (
            departure[1].route_id === id &&
            departure[1].departures.count === 1
          ) {
            remaining = compareTimes(departure);
            {
              return (
                <span className="remaining" style={{ color: timerColour }}>
                  <span className="remaining-number">{remaining}</span>{" "}
                  {hour ? "hrs" : "mins"}
                </span>
              );
            }
          }
        })}
    </div>
  );
};

export default TrainDepartures;
