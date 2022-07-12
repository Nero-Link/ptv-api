import { React, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Routes from "../routes/routes.component";
import Spinner from "../../components/spinner/spinner.component";
import {
  selectRoutesMap,
  selectRoutesIsLoading,
} from "../../sagas/routes/routes.selector";
import { route } from "../../App";

const Departures = () => {
  // const { route } = useParams();
  const routesMap = useSelector(selectRoutesMap);
  const isLoading = useSelector(selectRoutesIsLoading);
  const [routes, setRoutes] = useState(routesMap[route]);

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
          {routes &&
            routes.map((route) => <Routes key={route.id} route={route} />)}
        </div>
      )}
    </div>
  );
};

export default Departures;
