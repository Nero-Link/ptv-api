import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import URI from "urijs";
import swagger from "swagger-client";
import ptvApi from "ptv-api";

const devid = "3002174";
const apikey = "24030e89-d965-465f-8c63-f2e8072a3e89";
// ptvClient = ptvapi(devid, apikey);
// ptvClient
//   .then((apis) => {
//     return apis.Routes.Routes_RouteFromId({ route_id: 8960 });
//   })
//   .then((res) => {
//     console.log(res.body);
//   })
//   .catch(console.error);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
