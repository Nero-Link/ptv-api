import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";
import TramDepartures from "../../components/departures/tram-departures.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/trams/routes/routes.selector";
import { location } from "../../routes/config";

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
