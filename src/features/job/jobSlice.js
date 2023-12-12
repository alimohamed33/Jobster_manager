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

export const createJob = createAsyncThunk("job/createJob", createJobThunk);

export const editJob = createAsyncThunk("job/editJob", editJobThunk);

export const deleteJob = createAsyncThunk("job/deleteJob", deleteJobThunk);

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
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deleteJob.fulfilled, (_, { payload }) => {
        toast.success(payload);
      })
      .addCase(deleteJob.rejected, (_, { payload }) => {
        toast.error(payload);
      })
      .addCase(editJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
  // extraReducers: {
  //   // create job
  //   [createJob.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [createJob.fulfilled]: (state) => {
  //     state.isLoading = false;
  //     toast.success("Job created");
  //   },
  //   [createJob.rejected]: (_, { payload }) => {
  //     toast.error(payload);
  //   },

  //   // edit job
  //   [editJob.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [editJob.fulfilled]: (state) => {
  //     state.isLoading = false;
  //     toast.success("Job Modified...");
  //   },
  //   [editJob.rejected]: (state, { payload }) => {
  //     state.isLoading = false;
  //     toast.error(payload);
  //   },

  //   // delete job
  //   [deleteJob.fulfilled]: (_, { payload }) => {
  //     toast.success(payload);
  //   },
  //   [deleteJob.rejected]: (_, { payload }) => {
  //     toast.error(payload);
  //   },
  // },
});

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;
export default jobSlice.reducer;
