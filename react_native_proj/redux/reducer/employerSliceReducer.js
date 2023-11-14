import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "../../app/context/AuthContext";

const initialState = {
  account: {},
  employerId: 0,
  status: "idle",
  company: {},
};

const api = "https://72cb-27-69-6-204.ngrok-free.app/api/";

export const employerSlice = createSlice({
  name: "employer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployer.pending, (state, action) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(createEmployer.fulfilled, (state, action) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.employerId = action.payload.id;
          state.account = action.payload.attributes;
        }
      })

      .addCase(getEmployer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getEmployer.fulfilled, (state, action) => {
        state.status = "idle";
        state.account = action.payload.attributes;
        state.employerId = action.payload.id;
      })

      .addCase(updateEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.account = action.payload;
        state.status = "idle";
      })

      .addCase(uploadImageEmployer.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(uploadImageEmployer.fulfilled, (state, action) => {
        state.status = "idle";
      })

      .addCase(uploadImageCompany.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(uploadImageCompany.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

// Action creators are generated for each case reducer function

export const createEmployer = createAsyncThunk(
  "employer/createEmployer",
  async (userId) => {
    try {
      const res = await axios.post(api + "employers?populate=deep,3", {
        data: {
          profile: userId,
        },
      });
      return res.data.data;
    } catch (err) {
      showToast(err.response.data, "red");
    }
  }
);

export const getEmployer = createAsyncThunk(
  "employer/getEmployer",
  async (userId) => {
    try {
      const response = await axios.get(
        api + `employers?profile=${userId}&populate=deep,3`
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

export const uploadImageEmployer = createAsyncThunk(
  "employer/uploadImageEmployer",
  async (data) => {
    try {
      const response = await axios.post(api + "upload/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export const uploadImageCompany = createAsyncThunk(
  "employer/uploadImageCompany",
  async (data) => {
    try {
      const response = await axios.post(api + "upload/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

export default employerSlice.reducer;
