import { React, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Routes from "../routes/routes.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/routes/routes.selector";
import {
  selectDeparturesMap,
  selectDeparturesIsLoading,
} from "../../sagas/departures/departures.selector";
import { route } from "../../App";
import { store } from "../../sagas/store";

const Departures = () => {
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [routes, setRoutes] = useState(routesMap[route]);
  let newObject = [];

  const objectLoop = (route, routeIndex, data, index) => {
    if (newObject.length === 0) newObject = Object.entries(routesMap);
    let finalRoute = "";
    let outerLoop = () => {
      if (routeIndex === 0 && index === 1) {
        let innerLoop = () => {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            return data[i];
          }
          return innerLoop;
        };
        return outerLoop;
      }
    };
    finalRoute = route;

    return <Routes key={outerLoop} route={finalRoute} />;
  };

  useEffect(() => {
    setRoutes(routesMap[route]);
  }, [route, routesMap]);

  return (
    <div>
      <h2 className="route-title">{route}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="departure-container">
          {objectLoop(routesMap)}
          {newObject.length > 0 && console.log(newObject)}
          {/* {newObject.length > 0 &&
            newObject.map((route, routeIndex) => {
              route.forEach((data, index) => {
                <Routes
                  key={objectLoop(route, routeIndex, data, index)}
                  route={objectLoop(route, routeIndex, data, index)}
                />;
              });
            })} */}
        </div>
      )}
    </div>
  );
};

export default Departures;
