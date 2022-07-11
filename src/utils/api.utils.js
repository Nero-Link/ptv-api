import URI from "urijs";
import swagger from "swagger-client";
import * as CryptoJS from "crypto-js";

// let route = "";
let service = "";
let departures = [];

const apiConfig = {
  devid: "3002174",
  apikey: "24030e89-d965-465f-8c63-f2e8072a3e89",
};

const createSignature = (path, key) => {
  return CryptoJS.HmacSHA1(path, key).toString().toUpperCase();
};

export const ptvApi = async (devid, apikey) => {
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
  })
    .then((client) => client.apis)
    .then(console.log("Connected to PTV API!"));
};

export const getDepartures = async () => {
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

export const getDisruptions = async (obj) => {
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

export const setNext = (id, disruption) => {
  departures.forEach((departure) => {
    departure.disruptions.id.forEach(() => {
      if (departure.disruptions.id.includes(id)) {
        if (!departure.disruptions.title.includes(disruption))
          departure.disruptions.title.push(disruption);
      }
    });
  });
};

export const ptvClient = ptvApi(apiConfig.devid, apiConfig.apikey);
