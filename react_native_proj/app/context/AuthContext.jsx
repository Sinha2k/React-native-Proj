import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-root-toast";
import { COLORS } from "../../constants";
import { router } from "expo-router";

export const API_URL = "http://192.168.3.106:1337/api";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const showToast = (message, backgroundColor) => {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.TOP,
    backgroundColor: backgroundColor,
    shadowColor: "#B8B8B7",
    containerStyle: { zIndex: 2000 },
  });
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authenticated: false,
    token: "",
    user: {},
    status: "idle",
  });

  const getUser = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAuthState({
        token: token,
        authenticated: true,
        status: "idle",
        user: res.data.data.attributes,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return res.data.data.attributes;
    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync("TOKEN_KEY");
      if (token) {
        getUser(token);
      }
    };
    loadToken();
  }, []);

  const login = async (account) => {
    try {
      setAuthState({ ...authState, status: "loading" });
      const response = await axios.post(`${API_URL}/auth/local`, {
        identifier: account.email,
        password: account.password,
      });
      setAuthState({ ...authState, status: "success" });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.jwt}`;
      await SecureStore.setItemAsync("TOKEN_KEY", response.data.jwt);
      showToast("Login success", COLORS.tertiary);

      const res = await getUser(response.data.jwt);
      if (res.role.data.id == 1) {
        router.push("/role_permission");
      } else {
        router.push("/home");
      }
    } catch (err) {
      setAuthState({ ...authState, status: "error" });
      showToast(err.response.data.error.message, "red");
    }
  };

  const register = async (bodyData) => {
    try {
      setAuthState({ ...authState, status: "loading" });
      await axios.post(`${API_URL}/auth/local/register`, {
        username: bodyData["username"],
        email: bodyData["email"],
        password: bodyData["password"],
        code: Math.floor(Math.random() * (999999 - 100000) + 100000),
      });
      setAuthState({ ...authState, status: "success" });
      showToast("Signup success", COLORS.tertiary);
      router.push("/login");
    } catch (err) {
      setAuthState({ ...authState, status: "error" });
      showToast(err.response.data.error.message, "red");
    }
  };

  const logout = async () => {
    axios.defaults.headers.common["Authorization"] = "";

    await SecureStore.deleteItemAsync("TOKEN_KEY");
    setAuthState({
      authenticated: false,
      token: "",
      user: {},
      status: "idle",
    });
    showToast("Logout success", COLORS.tertiary);
    router.push("/login");
  };

  const updateRole = async (data) => {
    try {
      await axios.put(`${API_URL}/users/${data.userId}`, {
        role: data.role
      })
      router.push("/home")
    } catch (err) {
      showToast(err.response.data.error.message, "red")
    }
  }

  const value = {
    onLogin: login,
    onLogout: logout,
    onRegister: register,
    updateRole: updateRole,
    authState: authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
