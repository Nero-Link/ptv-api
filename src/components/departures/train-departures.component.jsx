import React from "react";
import { useState, useEffect, Fragment } from "react";
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
import { Departures } from "../../sagas/trains/departures/departures.types";
import { Disruptions } from "../../sagas/trains/disruptions/disruptions.types";

let departuresArray: [string, Departures][];
let disruptionsArray: [string, Disruptions][];

const TrainDepartures = ({ route }) => {
  const dispatch = useDispatch();

  const { id, name, service } = route;
  const departuresMap = useSelector(selectDeparturesMap);
  const departuresIsLoading = useSelector(selectDeparturesIsLoading);
  const [departures, setDepartures] = useState(departuresMap[route]);
  const disruptionsMap = useSelector(selectDisruptionsMap);
  const disruptionsIsLoading = useSelector(selectDisruptionsIsLoading);
  const [disruptions, setDisruptions] = useState(disruptionsMap[route]);

  const departuresLoop = (array: Departures[]): any => {
    if (departuresArray.length === 0)
      departuresArray = Object.entries(departuresMap);
    return;
  };

  const disruptionsLoop = (array: Disruptions[]): any => {
    if (disruptionsArray.length === 0)
      disruptionsArray = Object.entries(disruptionsMap);
    return;
  };

  useEffect(() => {
    setDepartures(departuresMap[route]);
  }, [departures, departuresMap]);

  useEffect(() => {
    setDisruptions(disruptionsMap[route]);
  }, [disruptions, disruptionsMap]);

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
            <Swiper
              slidesPerView={1}
              loop={true}
              speed={750}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
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
              </SwiperSlide>
              <SwiperSlide>
                {departuresLoop(departuresMap)}
                {departuresArray.length > 0 &&
                  departuresArray.map((departure) => {
                    if (
                      departure[1].route_id === id &&
                      departure[1].departures.count === 2
                    ) {
                      return departure[1].departures.time;
                    }
                  })}
              </SwiperSlide>
              <SwiperSlide>
                {departuresLoop(departuresMap)}
                {departuresArray.length > 0 &&
                  departuresArray.map((departure) => {
                    if (
                      departure[1].route_id === id &&
                      departure[1].departures.count === 3
                    ) {
                      return departure[1].departures.time;
                    }
                  })}
              </SwiperSlide>
              <SwiperSlide>
                {departuresLoop(departuresMap)}
                {departuresArray.length > 0 &&
                  departuresArray.map((departure) => {
                    if (
                      departure[1].route_id === id &&
                      departure[1].departures.count === 4
                    ) {
                      return departure[1].departures.time;
                    }
                  })}
              </SwiperSlide>
              <SwiperSlide>
                {departuresLoop(departuresMap)}
                {departuresArray.length > 0 &&
                  departuresArray.map((departure) => {
                    if (
                      departure[1].route_id === id &&
                      departure[1].departures.count === 5
                    ) {
                      return departure[1].departures.time;
                    }
                  })}
              </SwiperSlide>
            </Swiper>
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
              <Swiper
                slidesPerView={1}
                loop={true}
                speed={750}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
              >
                <SwiperSlide>
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
                </SwiperSlide>
                <SwiperSlide>
                  {departuresLoop(departuresMap)}
                  {departuresArray.length > 0 &&
                    departuresArray.map((departure) => {
                      if (
                        departure[1].route_id === id &&
                        departure[1].departures.count === 2 &&
                        departure[1].departures.platform !== null
                      ) {
                        return departure[1].departures.platform;
                      }
                    })}
                </SwiperSlide>
                <SwiperSlide>
                  {departuresLoop(departuresMap)}
                  {departuresArray.length > 0 &&
                    departuresArray.map((departure) => {
                      if (
                        departure[1].route_id === id &&
                        departure[1].departures.count === 3 &&
                        departure[1].departures.platform !== null
                      ) {
                        return departure[1].departures.platform;
                      }
                    })}
                </SwiperSlide>
                <SwiperSlide>
                  {departuresLoop(departuresMap)}
                  {departuresArray.length > 0 &&
                    departuresArray.map((departure) => {
                      if (
                        departure[1].route_id === id &&
                        departure[1].departures.count === 4 &&
                        departure[1].departures.platform !== null
                      ) {
                        return departure[1].departures.platform;
                      }
                    })}
                </SwiperSlide>
                <SwiperSlide>
                  {departuresLoop(departuresMap)}
                  {departuresArray.length > 0 &&
                    departuresArray.map((departure) => {
                      if (
                        departure[1].route_id === id &&
                        departure[1].departures.count === 5 &&
                        departure[1].departures.platform !== null
                      ) {
                        return departure[1].departures.platform;
                      }
                    })}
                </SwiperSlide>
              </Swiper>
            </Fragment>
          )}
        </span>
      </span>
      <span className="disruptions">
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
              <SwiperSlide>
                {" "}
                {disruptionsLoop(disruptionsMap)}
                {disruptionsArray.length > 0
                  ? disruptionsArray.map((disruption) => {
                      if (
                        disruption[1].route_id === id &&
                        disruption[1].disruptions.count === 1 &&
                        disruption[1].disruptions.title
                      ) {
                        return disruption[1].disruptions.title;
                      }
                    })
                  : "No disruptions"}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                {disruptionsLoop(disruptionsMap)}
                {disruptionsArray.length > 0
                  ? disruptionsArray.map((disruption) => {
                      if (
                        disruption[1].route_id === id &&
                        disruption[1].disruptions.count === 2 &&
                        disruption[1].disruptions.title
                      ) {
                        return disruption[1].disruptions.title;
                      }
                    })
                  : "No further disruptions"}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                {disruptionsLoop(disruptionsMap)}
                {disruptionsArray.length > 0
                  ? disruptionsArray.map((disruption) => {
                      if (
                        disruption[1].route_id === id &&
                        disruption[1].disruptions.count === 3 &&
                        disruption[1].disruptions.title
                      ) {
                        return disruption[1].disruptions.title;
                      }
                    })
                  : "No further disruptions"}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                {disruptionsLoop(disruptionsMap)}
                {disruptionsArray.length > 0
                  ? disruptionsArray.map((disruption) => {
                      if (
                        disruption[1].route_id === id &&
                        disruption[1].disruptions.count === 4 &&
                        disruption[1].disruptions.title
                      ) {
                        return disruption[1].disruptions.title;
                      }
                    })
                  : "No further disruptions"}
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                {disruptionsLoop(disruptionsMap)}
                {disruptionsArray.length > 0
                  ? disruptionsArray.map((disruption) => {
                      if (
                        disruption[1].route_id === id &&
                        disruption[1].disruptions.count === 5 &&
                        disruption[1].disruptions.title
                      ) {
                        return disruption[1].disruptions.title;
                      }
                    })
                  : "No further disruptions"}
              </SwiperSlide>
            </Swiper>
          </Fragment>
        )}
      </span>
    </div>
  );
};

export default TrainDepartures;
