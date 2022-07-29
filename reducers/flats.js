import {
    ADD_FLAT,
  RETRIEVE_FLATS,
  UPDATE_FLAT,
  DELETE_FLAT,
  } from "../actions/types";
  const initialState = [];
  function flatReducer(flats = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_FLAT:
        return [...flats, payload];
      case RETRIEVE_FLATS:
        return payload;
        case UPDATE_FLAT:
            return flats.map((flat) => {
              if (flat.flatId === payload.flatId) {
                return {
                  ...flat,
                  ...payload,
                };
              } else {
                return flat;
              }
            });
          case DELETE_FLAT:
            return flats.filter(({ flatId }) => flatId !== payload.flatId);
          
          default:
            return flats;
        }
      };
      export default flatReducer;