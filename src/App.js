import { useDispatch } from "react";
import logo from "./logo.svg";
import "./App.css";

import URI from "urijs";
import swagger, { clearCache } from "swagger-client";
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
  let next5 = [];
  let departures = [];
  let route = "";
  let service = "";

  const getRoute = ptvClient
    .then((apis) => {
      return apis.Routes.Routes_RouteFromId({ route_id: 3 });
    })
    .then((res) => {
      route = res.body.route.route_name;
      service = res.body.route.route_service_status.description;
      getDepartures();
    })
    .catch(console.error);

  const getDepartures = async () => {
    try {
      ptvClient
        .then((apis) => {
          return apis.Departures.Departures_GetForStopAndRoute({
            route_id: 3,
            route_type: 0,
            stop_id: 1181,
          });
        })
        .then((res) => {
          departures = res.body;
          let counter = 0;
          departures.departures.forEach((departure) => {
            if (
              new Date(departure.scheduled_departure_utc).getTime() >
              new Date().getTime() + 10 * 60000
            ) {
              if (departure.direction_id === 2) counter++;
              if (counter > 0 && counter <= 5 && departure.direction_id === 2) {
                //  try{ await getDisruptions(departure.disruption_ids);} catch(error){}
                next5.push({
                  count: counter,
                  time: new Date(
                    departure.scheduled_departure_utc
                  ).toLocaleString(),
                  platform: departure.platform_number,
                  disruptions: {
                    id: departure.disruption_ids,
                    // title: `${disruption}`,
                    title: `${getDisruptions(departure.disruption_ids)}`,
                  },
                });
              }
            }
          });
          console.log("Next 5 departures: ");
          console.log(next5);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getDisruptions = async (obj) =>
    obj.forEach((id) =>
      ptvClient
        .then((apis) => {
          return apis.Disruptions.Disruptions_GetDisruptionById({
            disruption_id: `${id}`,
          });
        })
        .then((res) => {
          console.log("Disruptions: ");
          id = res.body.disruption.title;
          console.log(id);
        })
        .catch(console.error)
    );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
