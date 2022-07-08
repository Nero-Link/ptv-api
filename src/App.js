// import { useDispatch } from "react";
import logo from "./logo.svg";
import "./App.css";

import URI from "urijs";
import swagger from "swagger-client";
import * as CryptoJS from "crypto-js";

const App = () => {
  // const dispatch = useDispatch();
  function createSignature(path, key) {
    return CryptoJS.HmacSHA1(path, key).toString().toUpperCase();
  }

  function ptvapi(devid, apikey) {
    return swagger({
      url: "https://timetableapi.ptv.vic.gov.au/v3/",
      spec: require("./ptv-openapi.json"),
      requestInterceptor: function (req) {
        let url = URI(req.url).addQuery({ devid: devid });
        let signature = createSignature(
          url.toString().replace(/.*ptv.vic.gov.au/, ""),
          apikey
        );
        req.url = url.addQuery({ signature: signature }).toString();
        return req;
      },
    }).then((client) => client.apis);
  }

  const devid = "3002174";
  const apikey = "24030e89-d965-465f-8c63-f2e8072a3e89";
  const ptvClient = ptvapi(devid, apikey);
  let route = "";
  let service = "";
  let departures = [];

  const getRoute = async () => {
    try {
      await ptvClient
        .then((apis) => {
          return apis.Routes.Routes_RouteFromId({ route_id: 3 });
        })
        .then((res) => {
          route = res.body.route.route_name;
          service = res.body.route.route_service_status.description;
          console.log(route);
          console.log(service);
          getDepartures();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartures = async () => {
    try {
      await ptvClient
        .then((apis) => {
          return apis.Departures.Departures_GetForStopAndRoute({
            route_id: 3,
            route_type: 0,
            stop_id: 1181,
          });
        })
        .then((res) => {
          let counter = 0;
          res.body.departures.forEach((departure) => {
            if (
              new Date(departure.scheduled_departure_utc).getTime() >
              new Date().getTime() + 10 * 60000
            ) {
              if (departure.direction_id === 2) counter++;
              if (counter > 0 && counter <= 5 && departure.direction_id === 2) {
                const disruptions = async () =>
                  await getDisruptions(departure.disruption_ids);
                disruptions();
                departures.push({
                  count: counter,
                  time: new Date(
                    departure.scheduled_departure_utc
                  ).toLocaleString(),
                  platform: departure.platform_number,
                  disruptions: {
                    id: departure.disruption_ids,
                    title: [],
                  },
                });
              }
            }
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getDisruptions = async (obj) => {
    try {
      await obj.forEach((id) =>
        ptvClient
          .then((apis) => {
            return apis.Disruptions.Disruptions_GetDisruptionById({
              disruption_id: `${id}`,
            });
          })
          .then((res) => {
            console.log("Disruptions: ");
            let title = res.body.disruption.title;
            console.log(title);
            console.log("Next");
            setNext5(id, title);
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const setNext5 = (id, disruption) => {
    console.log(departures);
    console.log("Begin");
    departures.forEach((departure) => {
      console.log("Starting...");
      departure.disruptions.id.forEach(() => {
        if (departure.disruptions.id.includes(id)) {
          if (!departure.disruptions.title.includes(disruption))
            departure.disruptions.title.push(disruption);
        }
      });
    });
    console.log("Next 5 departures: ");
    console.log(departures);
  };

  getRoute();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {route}: {service}
        </p>
        <p>
          {departures.map((departure) => {
            return departures;
          })}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
