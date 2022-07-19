import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/spinner.component";
import TramDepartures from "../departures/tram-departures.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/trams/routes/routes.selector";
import { route } from "../../routes/trams";

const TramRoutes = () => {
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [routes, setRoutes] = useState(routesMap[route]);
  let routesArray = [];
  const objectLoop = () => {
    if (routesArray.length === 0 && routesMap.length > 0)
      routesArray = Object.entries(routesMap);
    return;
  };

  useEffect(() => {
    setRoutes(routesMap[route]);
  }, [routes, routesMap, routesArray]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="routes-container tram-routes">
          {objectLoop(routesMap)}
          {routesArray.length > 0 &&
            routesArray.map((route) => {
              return <TramDepartures key={route[1].id} route={route[1]} />;
            })}
        </div>
      )}
    </div>
  );
};

export default TramRoutes;
