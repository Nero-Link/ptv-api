import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/autoplay";
import Spinner from "../../components/spinner/spinner.component";
import TramDepartures from "../../components/departures/tram-departures.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/trams/routes/routes.selector";
import { location } from "../../routes/config";

SwiperCore.use([Autoplay]);

const TramRoutes = () => {
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [routes, setRoutes] = useState(routesMap[location]);
  let routesArray = [];

  const objectLoop = () => {
    if (routesArray.length === 0 && routesMap.length > 0)
      routesArray = Object.entries(routesMap);
    return;
  };

  useEffect(() => {
    setRoutes(routesMap[location]);
  }, [routes, routesMap, routesArray]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="routes-container tram-routes">
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
                routesArray.map((route) => {
                  return (
                    <TramDepartures
                      key={route[1].id}
                      route={route[1]}
                      page={"0"}
                    />
                  );
                })}
            </SwiperSlide>
            <SwiperSlide>
              {objectLoop(routesMap)}
              {routesArray.length > 0 &&
                routesArray.map((route) => {
                  return (
                    <TramDepartures
                      key={route[1].id}
                      route={route[1]}
                      page={"1"}
                    />
                  );
                })}
            </SwiperSlide>
            <SwiperSlide>
              {objectLoop(routesMap)}
              {routesArray.length > 0 &&
                routesArray.map((route) => {
                  return (
                    <TramDepartures
                      key={route[1].id}
                      route={route[1]}
                      page={"2"}
                    />
                  );
                })}
            </SwiperSlide>
            <SwiperSlide>
              {objectLoop(routesMap)}
              {routesArray.length > 0 &&
                routesArray.map((route) => {
                  return (
                    <TramDepartures
                      key={route[1].id}
                      route={route[1]}
                      page={"3"}
                    />
                  );
                })}
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default TramRoutes;
