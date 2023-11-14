import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "../../app/context/AuthContext";
import { COLORS } from "../../constants";

const initialState = {
  jobDetail: {},
  jobList: [],
  status: "idle",
};

const api = "https://72cb-27-69-6-204.ngrok-free.app/api/";

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state, action) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.jobList = action.payload;
        }
      })

      .addCase(getJobById.pending, (state, action) => {
          state.status = "loading";
      })
      .addCase(getJobById.fulfilled, (state, action) => {
          state.status = "idle";
          state.jobDetail = action.payload;
      })

      .addCase(createJob.pending, (state, action) => {
          state.status = "loading";
      })
      .addCase(createJob.fulfilled, (state, action) => {
          state.status = "idle";
          // state.jobDetail = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function

export const getAllJobs = createAsyncThunk("jobs/getAllJobs", async () => {
  try {
    const response = await axios.get(api + 'jobs?populate=deep,3');
    return response.data.data;
  } catch (err) {
    console.log(err.msg);
  }
});

export const getJobById = createAsyncThunk("jobs/getJobById", async (paramId) => {
  try {
    const response = await axios.get(api + `jobs/${paramId}?populate=deep,3`);
    return response.data.data.attributes;
  } catch (err) {
    console.log(err.msg);
  }
});

export const createJob = createAsyncThunk("jobs/createJob", async (data) => {
  try {
    const response = await axios.post(api + 'jobs', {
      data: data
    });
    showToast("Create job success", COLORS.tertiary)
    return response.data.data;
  } catch (err) {
    showToast(err.response, "red")
  }
});

export default jobSlice.reducer;
