import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import URI from "urijs";
import swagger from "swagger-client";
import * as CryptoJS from "crypto-js";

import { createAction } from "./utils/reducer.utils";
import { fetchRoutesStart } from "./sagas/routes/routes.action";

import logo from "./logo.svg";
import "./App.css";

export let route = [1, 2, 3];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRoutesStart());
  }, [dispatch]);

  function createSignature(path, key) {
    return CryptoJS.HmacSHA1(path, key).toString().toUpperCase();
  }

  function ptvapi(devid, apikey) {
    return swagger({
      url: "https://timetableapi.ptv.vic.gov.au/v3/",
      spec: require("./utils/ptv-openapi.json"),
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
  let timer = 0;
  let timeout = 30000;

  function setTime() {
    timeout = document.getElementById("timeout").value * 1000;
    timer = 0;
    console.log(timeout);
    // timerReset();
  }

  function reset() {
    route = "";
    service = "";
    departures = [];
    timer = 0;
    // getRoute();
  }

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
            direction_id: 2,
            max_results: 10,
          });
        })
        .then((res) => {
          let counter = 0;
          res.body.departures.forEach((departure) => {
            let departTime;
            if (departure.estimated_departure_utc != null)
              departTime = departure.estimated_departure_utc;
            else departTime = departure.scheduled_departure_utc;
            if (
              new Date(departTime).getTime() >
              new Date().getTime() + 10 * 60000
            ) {
              counter++;
              if (counter < 6) {
                const disruptions = async () =>
                  await getDisruptions(departure.disruption_ids);
                disruptions();
                departures.push({
                  count: counter,
                  time: new Date(departTime).toLocaleString(),
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
      console.log("Next 5 departures: ");
      console.log(departures);
    } catch (error) {
      console.log(error);
    }
  };

  const getDisruptions = async (obj) => {
    try {
      await obj.forEach((id) => {
        ptvClient
          .then((apis) => {
            return apis.Disruptions.Disruptions_GetDisruptionById({
              disruption_id: `${id}`,
            });
          })
          .then((res) => {
            setNext(id, res.body.disruption.title);
          });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setNext = (id, disruption) => {
    departures.forEach((departure) => {
      departure.disruptions.id.forEach(() => {
        if (departure.disruptions.id.includes(id)) {
          if (!departure.disruptions.title.includes(disruption))
            departure.disruptions.title.push(disruption);
        }
      });
    });
  };

  reset();

  // setInterval(function () {
  //   timer++;
  //   console.log(timer);
  // }, 1000);

  // setInterval(function () {
  //   reset();
  // }, timeout);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {route}: {service} {timer}
        </p>
        <p>
          {departures.map((departure) => {
            return departures;
          })}
        </p>
        <select
          onChange={(e) => setTime(e.target.value)}
          defaultValue={3}
          id="timeout"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
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
