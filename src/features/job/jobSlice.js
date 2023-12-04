import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJobThunk } from "./jobThunk";
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
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success("Job created");
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleChange, clearValues } = jobSlice.actions;
export default jobSlice.reducer;
