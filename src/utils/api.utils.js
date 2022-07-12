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
