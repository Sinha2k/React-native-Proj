import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  account: {},
  employeeId: 0,
  status: "idle",
};

const api = "https://9107-2402-800-61cf-8b27-b40e-9466-d1d1-fb91.ngrok-free.app/api/";

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state, action) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        if (state.status === "loading") {
          state.status = "idle";
        }
      })

      .addCase(getEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.status = "idle";
        state.account = action.payload.attributes;
        state.employeeId = action.payload.id;
      })

      .addCase(updateEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.account = action.payload;
        state.status = "idle";
      })

      .addCase(uploadImage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

// Action creators are generated for each case reducer function

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (userId) => {
    try {
      await axios.post(api + "employees", {
        data: {
          profile: userId,
          placeJob: [],
          desiredJob: [],
        },
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const getEmployee = createAsyncThunk(
  "employee/getEmployee",
  async (userId) => {
    try {
      const response = await axios.get(
        api + `employees?filters[profile][id][$eq]=${userId}&populate=deep,4`
      );
      return response.data.data[0];
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (data) => {
    try {
      const response = await axios.put(
        api + `employees/${data.employeeId}?populate=deep,3`,
        {
          data: data.bodyData,
        }
      );
      return response.data.data.attributes;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const uploadImage = createAsyncThunk(
  "employee/uploadImage",
  async (data) => {
    try {
      const response = await axios.post(api + "upload/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export default employeeSlice.reducer;
