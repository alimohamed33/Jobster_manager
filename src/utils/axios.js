import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";
import { clearStore } from "../features/user/userSlice";

export const customFetch = axios.create({
  baseURL: "https://jobify-prod.herokuapp.com/api/v1/toolkit",
});

// customFetch.interceptors to modify the request
customFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage();
    if (user) config.headers.Authorization = `Bearer ${user.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error.message);
  }
);

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};
