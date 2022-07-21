import train from "../images/train.svg";
import tram from "../images/tram.svg";
import "../App.css";
import { useState } from "react";

export const timeout = 12;
export const tick = 5000;

export let location = { latitude: "-37.816774", longitude: "144.955539" };
export let stops = [2091, 2087, 2496, 2497, 3106];
export let routes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 16, 17];

const Config = () => {
  let [stops, setStops] = useState(0);
  let [routes, setRoutes] = useState(0);
  let [timeout, setTimeout] = useState(0);

  return (
    <div className="App">
      <div className="banner">
        <a href="/trains">
          {<img src={train} height="50px" className="logo" />}
        </a>
        <h2 className="title">Ippon PTV App Configuration</h2>
        <a href="/trams">{<img src={tram} height="50px" className="logo" />}</a>
      </div>
      <div>
        <br />
        <br />
        <div className="select-config">
          <div>
            <label for="routes">Train Routes</label>
            <br />
            <br />
            <select
              multiple
              name="routes"
              id="routes"
              options={routes}
              defaultValue={[
                routes[0],
                routes[1],
                routes[2],
                routes[3],
                routes[4],
                routes[5],
                routes[6],
                routes[7],
                routes[8],
                routes[9],
                routes[10],
                routes[11],
                routes[12],
                routes[13],
                routes[14],
              ]}
              onChange={(e) => {
                setRoutes(e.target.value);
              }}
            >
              <option value={"1"}>Alamein</option>
              <option value={"2"}>Belgrave</option>
              <option value={"3"}>Craigiburn</option>
              <option value={"4"}>Cranbourne</option>
              <option value={"6"}>Frankston</option>
              <option value={"7"}>Glen Waverley</option>
              <option value={"8"}>Hurstbridge</option>
              <option value={"9"}>Lilydale</option>
              <option value={"5"}>Mernda</option>
              <option value={"11"}>Pakenham</option>
              <option value={"12"}>Sandringham</option>
              <option value={"14"}>Sunbury</option>
              <option value={"15"}>Upfield</option>
              <option value={"16"}>Werribee</option>
              <option value={"17"}>Williamstown</option>
            </select>
          </div>
          <div>
            <label for="stops">Tram Stops</label>
            <br />
            <br />
            <select
              multiple
              name="stops"
              id="stops"
              options={stops}
              defaultValue={[stops[0], stops[1], stops[2], stops[3], stops[4]]}
              onChange={(e) => {
                setStops(e.target.value);
              }}
            >
              <option value={"2091"}>#1 Spencer St/Bourke St</option>
              <option value={"2087"}>#3 William St/Bourke St</option>
              <option value={"2496"}>#1 Spencer St/Collins St</option>
              <option value={"2497"}>#122 Southern Cross/Spencer St</option>
              <option value={"3106"}>#5 Bourke St/William St</option>
            </select>
            <br />
            <br />
            <label for="timeout">Refresh Timer</label>
            <br />
            <br />
            <select
              defaultValue={"12"}
              onChange={(e) => {
                setTimeout(e.target.value);
              }}
            >
              <option value={"12"}>Every 1 minute</option>
              <option value={"36"}>Every 3 minutes</option>
              <option value={"60"}>Every 5 minutes</option>
              <option value={"120"}>Every 10 minutes</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Config;
