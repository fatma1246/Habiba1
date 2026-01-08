import axios from "axios";

const API = axios.create({
  baseURL: "https://api-yeshtery.dev.meetusvr.com/v1",
});

export const loginApi = (data) =>
  API.post("/yeshtery/token", {
    email: data.email,
    password: data.password,
    orgId: 2,
    isEmployee: false,
  });

export const getUserInfoApi = (token) =>
  API.get("/user/info", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

export default API;
