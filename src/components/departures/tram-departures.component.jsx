import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Spinner from "../spinner/spinner.component";
import {
  selectDeparturesMap,
  selectDeparturesIsLoading,
} from "../../sagas/trams/departures/departures.selector";
import {
  selectDisruptionsMap,
  selectDisruptionsIsLoading,
} from "../../sagas/trams/disruptions/disruptions.selector";

const TramDepartures = ({ route, page }) => {
  const dispatch = useDispatch();

  const { id, name, stop, routes } = route;
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
  let routeCount = 0;
  let departCount = 0;
  let remainingCount = 0;

  const getPage = () => {
    if (page > routes.length - 1) page = routes.length - 1;
    return page;
  };

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

  const checkRoutes = (item) => {
    let result = false;
    routes.forEach((route) => {
      if (item.route_id === route.route_id && item.departures.stop_id === id)
        result = true;
    });
    return result;
  };

  const getRouteNumber = (item) => {
    let result = "";
    routes.forEach((route) => {
      if (item.route_id === route.route_id && item.departures.stop_id === id) {
        result = route.route_number;
      }
    });
    return result;
  };

  const getRouteName = (item) => {
    let result = "";
    routes.forEach((route) => {
      if (item.route_id === route.route_id && item.departures.stop_id === id) {
        result = route.route_name;
      }
    });
    return result;
  };

  const checkDisruptions = (item) => {
    let result = "";
    routes.forEach((route) => {
      item.routes.forEach((disrupt) => {
        if (disrupt.route_id === route.route_id) {
          result = true;
        }
      });
    });
    return result;
  };

  const compareTimes = (departure) => {
    const currTime = new Date();
    const departTime = departure[1].departures.fullTime;
    const distance = departTime.getTime() - currTime.getTime();
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    if (minutes > 10) {
      timerColour = "green";
    } else if (minutes < 10 && minutes > 5) {
      timerColour = "orange";
    } else if (minutes <= 5) {
      timerColour = "red";
    }
    if (currTime > departTime) return "0";
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

  return (
    <div className="departure-container tram" id={id}>
      <span
        className={
          name.length + stop.length < 23 ? "name tram" : "name tram long"
        }
      >
        #{stop}
        {name.length + stop.length < 23 ? name : name.substring(0, 23)}
        {departuresLoop(departuresMap)}
        {departuresArray.length > 0 &&
          departuresArray.map((departure) => {
            if (routes[getPage()].route_id === departure[1].route_id) {
              if (getRouteNumber(departure[1]) && getRouteName(departure[1])) {
                routeCount++;
                if (routeCount === 1)
                  return (
                    <Fragment>
                      <br />
                      {getRouteNumber(departure[1])}{" "}
                      <span className="tram-route" key={routeCount}>
                        {getRouteName(departure[1])}
                      </span>
                    </Fragment>
                  );
              }
            }
          })}
      </span>
      <span className="departing tram">
        {departuresIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            {departuresLoop(departuresMap)}
            {departuresArray.length > 0 &&
              departuresArray.map((departure) => {
                if (
                  routes[getPage()].route_id === departure[1].route_id &&
                  id === departure[1].departures.stop_id
                ) {
                  departCount++;
                  if (checkRoutes(departure[1])) {
                    if (departCount === 3)
                      return `${departure[1].departures.time}`;
                    else if (departCount < 3)
                      return `${departure[1].departures.time} | `;
                  }
                }
              })}
          </Fragment>
        )}
      </span>
      <span className="remaining-container">
        {departuresIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            {departuresArray.length > 0 &&
              departuresArray.map((departure) => {
                if (
                  routes[getPage()].route_id === departure[1].route_id &&
                  id === departure[1].departures.stop_id
                ) {
                  remaining = compareTimes(departure);
                  remainingCount++;
                  {
                    if (remainingCount === 1)
                      return (
                        <span
                          className="remaining tram"
                          style={{
                            color: timerColour,
                          }}
                        >
                          <span className="remaining-number">{remaining}</span>{" "}
                          {hour ? "hrs" : "mins"}
                        </span>
                      );
                  }
                }
              })}
          </Fragment>
        )}
      </span>
    </div>
  );
};

export default TramDepartures;
