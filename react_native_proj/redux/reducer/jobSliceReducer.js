import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  jobDetail: {},
  jobList: [],
  status: "idle",
};

const api = "http://192.168.3.106:1337/api/";

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

export default jobSlice.reducer;
