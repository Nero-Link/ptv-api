import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import URI from "urijs";
import swagger from "swagger-client";
import * as CryptoJS from "crypto-js";

function createSignature(path, key) {
  return CryptoJS.HmacSHA1("sha1", key)
    .update(path)
    .digest("hex")
    .toUpperCase();
}

function ptvapi(devid, apikey) {
  return swagger({
    url: "https://timetableapi.ptv.vic.gov.au/swagger/ui/index", // Let's hope this doesn't get used for anything
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
ptvClient
  .then((apis) => {
    return apis.Routes.Routes_RouteFromId({ route_id: 8960 });
  })
  .then((res) => {
    console.log(res.body);
  })
  .catch(console.error);

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
