import axios from "axios";

// export const clientDatabase = axios.create({
//   baseURL: "http://localhost:3001",
// });

export const clientDatabase = axios.create({
  baseURL: "http://sl.vvs693.ru:3001",
});

clientDatabase.interceptors.request.use((config) => {
  config.headers!.authorization = window.localStorage.getItem("token");
  return config;
});




// export const client = axios.create({
//     baseURL: "https://elated-warp-parrotfish.glitch.me/items",
//     // baseURL: "https://sl.vvs693.ru:4000/items"
//   });

// export const client = axios.create({
//   baseURL: "http://localhost:3001",
// });

// client.interceptors.request.use((config) => {
//   config.headers!.authorization = window.localStorage.getItem("token");
//   return config;
// });
