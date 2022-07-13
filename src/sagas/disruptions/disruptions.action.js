import { createAction } from "../../utils/reducer.utils";
import { DISRUPTIONS_ACTION_TYPES } from "./disruptions.types";
import { ptvClient } from "../../utils/api.utils";
import { store } from "../store";

export const fetchDisruptionsStart = () =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_START);

export const fetchDisruptionsSuccess = (disruptions) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_SUCCESS, disruptions);

export const fetchDisruptionsFailed = (error) =>
  createAction(DISRUPTIONS_ACTION_TYPES.FETCH_DISRUPTIONS_FAILED, error);

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
          // setNext(id, res.body.disruption.title);
        });
    });
  } catch (error) {
    console.log(error);
  }
};

// export const setNext = (id, disruption) => {
//   departures.forEach((departure) => {
//     departure.disruptions.id.forEach(() => {
//       if (departure.disruptions.id.includes(id)) {
//         if (!departure.disruptions.title.includes(disruption))
//           departure.disruptions.title.push(disruption);
//       }
//     });
//   });
// };
