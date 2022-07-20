import { React, useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
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

SwiperCore.use([Autoplay]);

const TramDepartures = ({ route }) => {
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
        let r1 = route.route_name;
        let r2 = r1.substring(r1.length, r1.indexOf("-"));
        result = r2.substring(2);
      }
    });
    return result;
  };

  const checkDisruptions = (item) => {
    let result = "";
    routes.forEach((route) => {
      item.routes.forEach((disrupt) => {
        if (disrupt.route_id === route.route_id) {
          // console.log(disrupt);
          result = true;
        }
      });
    });
    return result;
  };

  useEffect(() => {
    setDepartures(departuresMap[route]);
  }, [departures, departuresMap]);

  useEffect(() => {
    setDisruptions(disruptionsMap[route]);
  }, [disruptions, disruptionsMap]);

  return (
    <div className="departure-container" id={id}>
      <span
        className={
          name.length + stop.length < 24 ? "name tram" : "name tram long"
        }
      >
        #{stop}
        {name.length + stop.length < 24 ? name : name.substring(0, 24)}
        <Swiper
          slidesPerView={1}
          loop={true}
          speed={750}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {departuresLoop(departuresMap)}
          {departuresArray.length > 0 &&
            departuresArray.map((departure) => {
              if (getRouteName(departure[1])) {
                return <SwiperSlide>{getRouteName(departure[1])}</SwiperSlide>;
              }
            })}
        </Swiper>
      </span>
      <span className="departing">
        {departuresIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Swiper
              slidesPerView={1}
              loop={true}
              speed={750}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {departuresLoop(departuresMap)}
              {departuresArray.length > 0 &&
                departuresArray.map((departure) => {
                  if (checkRoutes(departure[1])) {
                    return (
                      <SwiperSlide>{departure[1].departures.time}</SwiperSlide>
                    );
                  }
                })}
            </Swiper>
          </Fragment>
        )}
      </span>
      <span className="platform">
        Route{" "}
        <span className="number">
          <br />
          {departuresIsLoading ? (
            <Spinner />
          ) : (
            <Fragment>
              <Swiper
                slidesPerView={1}
                loop={true}
                speed={750}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                {departuresLoop(departuresMap)}
                {departuresArray.length > 0 &&
                  departuresArray.map((departure) => {
                    if (getRouteNumber(departure[1])) {
                      return (
                        <SwiperSlide>
                          {getRouteNumber(departure[1])}
                        </SwiperSlide>
                      );
                    }
                  })}
              </Swiper>
            </Fragment>
          )}
        </span>
      </span>
      <span className="disruptions tram">
        {disruptionsIsLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Swiper
              slidesPerView={1}
              loop={true}
              speed={750}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {disruptionsLoop(disruptionsMap)}
              {disruptionsArray.length > 0
                ? disruptionsArray.map((disruption) => {
                    if (checkDisruptions(disruption[1])) {
                      return <SwiperSlide>{disruption[1].title}</SwiperSlide>;
                    }
                  })
                : "No disruptions"}
            </Swiper>
          </Fragment>
        )}
      </span>
    </div>
  );
};

export default TramDepartures;
