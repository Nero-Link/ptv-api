import { React, useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import Spinner from "../spinner/spinner.component";
import TrainDepartures from "../departures/train-departures.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/trains/routes/routes.selector";
import { routes } from "../../routes/config";

const TrainRoutes = () => {
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [route, setRoutes] = useState(routesMap[routes]);
  let routesArray = [];
  const objectLoop = () => {
    if (routesArray.length === 0 && routesMap.length > 0)
      routesArray = Object.entries(routesMap);
    return;
  };

  useEffect(() => {
    setRoutes(routesMap[routes]);
  }, [route, routesMap, routesArray]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="routes-container">
          <Fragment>
            <Swiper
              slidesPerView={1}
              loop={true}
              speed={750}
              autoplay={{
                delay: 30000,
                disableOnInteraction: false,
              }}
            >
              <SwiperSlide>
                {objectLoop(routesMap)}
                {routesArray.length > 0 &&
                  routesArray.slice(0, 7).map((route) => {
                    return (
                      <TrainDepartures key={route[1].id} route={route[1]} />
                    );
                  })}
              </SwiperSlide>
              <SwiperSlide>
                {objectLoop(routesMap)}
                {routesArray.length > 0 &&
                  routesArray.slice(7, 14).map((route) => {
                    return (
                      <TrainDepartures key={route[1].id} route={route[1]} />
                    );
                  })}
              </SwiperSlide>
            </Swiper>
          </Fragment>
        </div>
      )}
    </div>
  );
};

export default TrainRoutes;
