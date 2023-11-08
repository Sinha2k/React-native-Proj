import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import { COLORS } from "../../constants";

const initialState = {
  token: "",
  user: {},
  authenticated: false,
  status: "idle",
};

const api = "http://192.168.44.104:1337/api/";

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginStart: (state, action) => {
      state.status = "loading";
    },
    loginSuccess: async (state, action) => {
      state.authenticated = true;
      state.status = "success";
      state.token = action.payload.jwt;
      state.user = action.payload.user;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.jwt}`;
      await SecureStore.setItemAsync("TOKEN_KEY", action.payload.jwt);
      Toast.show("Login success", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.tertiary,
        shadowColor: "#B8B8B7",
        containerStyle: { zIndex: 2000 },
      });
      router.push("/home");
    },
    loginError: (state, action) => {
      state.status = "error";
      Toast.show(action.payload, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        shadowColor: "#B8B8B7",
      });
    },
    logout: async (state, action) => {
      await SecureStore.deleteItemAsync("TOKEN_KEY");
      axios.defaults.headers.common["Authorization"] = "";
      state = initialState;
      Toast.show("Logout success", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.tertiary,
        shadowColor: "#B8B8B7",
        containerStyle: { zIndex: 2000 },
      });
      router.replace("/auth/login");
      console.log("Logout", state);
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(login.pending, (state, action) => {
      //   state.status = "loading";
      // })
      // .addCase(login.fulfilled, async (state, action) => {
      //   state.status = "success";
      //   state.token = action.payload.jwt;
      //   state.user = action.payload.user;
      //   state.authenticated = true;

      //   // axios.defaults.headers.common[
      //   //   "Authorization"
      //   // ] = `Bearer ${action.payload.jwt}`;
      //   await SecureStore.setItemAsync("TOKEN_KEY", action.payload.jwt);
      //   console.log("Login", state);
      // })
      // .addCase(login.rejected, (state, action) => {
      //   console.log("error rejected");
      //   state.status = "error";
      // })

      .addCase(signup.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, async (state, action) => {
        state.status = "success";
        state.token = action.payload.jwt;
        state.user = action.payload.user;
        state.authenticated = true;

        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `Bearer ${action.payload.jwt}`;
        await SecureStore.setItemAsync("TOKEN_KEY", action.payload.jwt);
      })
      .addCase(signup.rejected, (state, action) => {
        console.log("error rejected");
        state.status = "error";
      });

    //   .addCase(getJobById.pending, (state, action) => {
    //       state.status = "loading";
    //   })
    //   .addCase(getJobById.fulfilled, (state, action) => {
    //       state.status = "idle";
    //       state.jobDetail = action.payload;
    //   });
  },
});

// Action creators are generated for each case reducer function

export const login = createAsyncThunk(
  "auth/login",
  async (bodyData, { rejectWithValue, fulfillWithValue }) => {
    console.log("blabla", bodyData);
    // return new Promise((resolve, reject) => {
    //   axios.post(api + "auth/local", {
    //     identifier: bodyData.email,
    //     password: bodyData.password,
    //   }).then(response => {
    //     resolve(response.data);
    //     console.log(response.data);
    //   }).catch(error => reject(error))
    // })
    try {
      const response = await axios.post(api + "auth/local", {
        identifier: bodyData.email,
        password: bodyData.password,
      });
      Toast.show("Login success", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.tertiary,
        shadowColor: "#B8B8B7",
        containerStyle: { zIndex: 2000 },
      });
      router.push("/home");
      return response.data;
    } catch (err) {
      Toast.show(err.response.data.error.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        shadowColor: "#B8B8B7",
      });
      console.log("reducer", err);
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error.message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (bodyData, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await axios.post(api + "auth/local", {
        identifier: bodyData.email,
        password: bodyData.password,
      });
      Toast.show("Signup success", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: COLORS.tertiary,
        shadowColor: "#B8B8B7",
        containerStyle: { zIndex: 2000 },
      });
      router.push("/home");
      return response.data;
    } catch (err) {
      Toast.show(err.response.data.error.message, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        shadowColor: "#B8B8B7",
      });
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data.error.message);
    }
  }
);

// export const getJobById = createAsyncThunk("jobs/getJobById", async (paramId) => {
//   try {
//     const response = await axios.get(api + `jobs/${paramId}?populate=deep,3`);
//     return response.data.data.attributes;
//   } catch (err) {
//     console.log(err.msg);
//   }
// });

export const { loginStart, loginSuccess, loginError, logout } =
  authSlice.actions;

export default authSlice.reducer;
