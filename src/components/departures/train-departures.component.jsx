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
  }, [departures, departuresMap]);

  useEffect(() => {
    setDisruptions(disruptionsMap[route]);
  }, [disruptions, disruptionsMap]);

  let colour = "green";
  if (service === "Good Service") {
    colour = "green";
  } else if (service === "Minor Delays") {
    colour = "yellow";
  } else if (service === "Major Delays") {
    colour = "red";
  } else if (service === "Planned Works") {
    colour = "orange";
  }
  return (
    <div className="departure-container" id={id}>
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
                  return `${departure[1].departures.time} | `;
                }
              })}
          </Fragment>
        )}
      </span>
      <span className="remaining" style={{ color: colour }}>
        <span className="remaining-number">4</span> mins
      </span>
      {/* <span className="disruptions">
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
      </span> */}
    </div>
  );
};

export default TrainDepartures;
