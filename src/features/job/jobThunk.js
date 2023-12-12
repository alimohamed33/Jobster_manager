import { checkForUnauthorizedResponse, customFetch } from "../../utils/axios";
import { getAllJobs, hideLoading, showLoading } from "../allJobs/allJobsSlice";
import { clearValues } from "./jobSlice";

// create job
export const createJobThunk = async (job, thunkAPI) => {
  try {
    const response = await customFetch.post("/jobs", job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

// edit job
export const editJobThunk = async ({ jobID, job }, thunkAPI) => {
  try {
    const response = await customFetch.patch(`/jobs/${jobID}`, job);
    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
