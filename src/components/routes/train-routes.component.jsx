import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Departures from "../departures/departures.component";
import Spinner from "../spinner/spinner.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/routes/routes.selector";
import { route } from "../../App";

const TrainRoutes = () => {
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [routes, setRoutes] = useState(routesMap[route]);
  let newObject = [];

  const objectLoop = () => {
    if (newObject.length === 0) newObject = Object.entries(routesMap);
    return;
  };

  useEffect(() => {
    setRoutes(routesMap[route]);
  }, [routes, routesMap]);

  return (
    <div>
      <h2 className="route-title">{route}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="departure-container">
          {objectLoop(routesMap)}
          {newObject.length > 0 && console.log(newObject)}
          {newObject.length > 0 &&
            newObject.map((route) => {
              return <Departures key={route[1].id} route={route[1]} />;
            })}
        </div>
      )}
    </div>
  );
};

export default TrainRoutes;
