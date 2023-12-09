import { customFetch } from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { logoutUser } from "../user/userSlice";
import { clearValues } from "./jobSlice";

// create job
export const createJobThunk = async (url, job, thunkAPI) => {
  try {
    const response = await customFetch.post(url, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    //  error 401 = unauthorized
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// edit job
export const editJobThunk = async ({ jobID, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobID}`, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

// delete job
export const deleteJobThunk = async (jobID, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const response = await customFetch.delete(`/jobs/${jobID}`);
    thunkAPI.dispatch(getAllJobs());
    return response.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
