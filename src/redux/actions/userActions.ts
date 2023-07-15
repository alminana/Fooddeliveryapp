import axios from "axios";
import { Dispatch } from "react";
import { Address } from "../models";
import AsyncStorage from "@react-native-community/async-storage";

export interface UpdateLocationAction{
    readonly type: 'ON_UPDATE_LOCATION',
    payload: Address
}

export interface UserErrorAction {
    readonly type: "ON_USER_ERROR";
    payload: any;
  }

  export type UserAction = UpdateLocationAction | UserErrorAction

  //User Actioins trigger from Components

  export const onUpdateLocation = (location: Address) => {
    return async (dispatch: Dispatch<UserAction>) => {
      try {
        const locationString = JSON.stringify(location);
        await AsyncStorage.setItem("user_location", locationString);
        // save our location in local storage
        dispatch({
          type: "ON_UPDATE_LOCATION",
          payload: location,
        });
      } catch (error) {
        dispatch({
          type: "ON_USER_ERROR",
          payload: error,
        });
      }
    };
  };