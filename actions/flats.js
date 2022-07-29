import {
  ADD_FLAT,
  RETRIEVE_FLATS,
  UPDATE_FLAT,
  DELETE_FLAT,
  
} from "./types";
import  FlatService from "../services/FlatService";
//we are creating action objects so that they can be dispatched to the store
//addProduct --dispatch object from where -
// when we  bindActionCreators -- destructured object of diff vars and functions and to that we are tying the dispatch
//useDispatch hook , which will give us the constant of dispatch

export const addFlat = ({cost,availability}) => async (dispatch) => {
  try {
    //first the call to back end server is happening
    //data of product type and we receive server response

    const res = await FlatService.create({cost,availability});
    dispatch({
        type: ADD_FLAT,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const retrieveFlats = () => async (dispatch) => {
    try {
      const res = await FlatService.getAll();
      dispatch({
        type: RETRIEVE_FLATS,
        payload:res.data,
      });
     
    
  }
  catch(err){return Promise.reject(err);}};
  
  
  export const updateFlat = (flatId,data) => async (dispatch) => {
    try {
      const res = await FlatService.update(flatId,data);
      dispatch({
        type: UPDATE_FLAT,
        payload: data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  export const  deleteFlat= (flatId) => async (dispatch) => {
    try {
      await FlatService.remove(flatId);
      dispatch({
        type: DELETE_FLAT,
        payload: { flatId },
      });
    } catch (err) {
      console.log(err);
    }
  };
