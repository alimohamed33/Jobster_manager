import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJobThunk, editJobThunk, deleteJobThunk } from "./jobThunk";
import { toast } from "react-toastify";
import { getUserFromLocalStorage } from "../../utils/localStorage";

const initialState = {
  isLoading: false,
  isEditing: false,
  company: "",
  position: "",
  editJobId: "",
  jobLocation: "",
  status: "pending",
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
};

export const createJob = createAsyncThunk(
  "job/createJob",
  async (job, thunkAPI) => createJobThunk("/jobs", job, thunkAPI)
);

export const editJob = createAsyncThunk(
  "job/editJob",
  async ({ jobID, job }, thunkAPI) => editJobThunk({ jobID, job }, thunkAPI)
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobID, thunkAPI) => deleteJobThunk(jobID, thunkAPI)
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || "",
      };
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: {
    // create job
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success("Job created");
    },
    [createJob.rejected]: (_, { payload }) => {
      toast.error(payload);
    },

    // edit job
    [editJob.pending]: (state) => {
      state.isLoading = true;
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false;
      toast.success("Job Modified...");
    },
    [editJob.rejected]: (_, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },

    // delete job
    [deleteJob.fulfilled]: (_, { payload }) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (_, { payload }) => {
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
