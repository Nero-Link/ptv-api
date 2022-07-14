import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import Departures from "../departures/departures.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/routes/routes.selector";
import { route } from "../../App";

const TrainRoutes = () => {
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [routes, setRoutes] = useState(routesMap[route]);
  let routesArray = [];

  const objectLoop = () => {
    if (routesArray.length === 0) routesArray = Object.entries(routesMap);
    return;
  };

  useEffect(() => {
    setRoutes(routesMap[route]);
  }, [routes, routesMap]);

  return (
    <div>
      <h2 className="route-title">Southern Cross Train Departures</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="routes-container">
          {objectLoop(routesMap)}
          {routesArray.length > 0 &&
            routesArray.map((route) => {
              return <Departures key={route[1].id} route={route[1]} />;
            })}
        </div>
      )}
    </div>
  );
};

export default TrainRoutes;
