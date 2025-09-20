// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// function withKey(params = {}) {
//   return {
//     key: API_KEY,
//     ...params,
//   };
// }

// export const apiService = {
//   async getIncomes(params = {}) {
//     return (await apiClient.get("/incomes", { params: withKey(params) })).data;
//   },
//   async getOrders(params = {}) {
//     return (await apiClient.get("/orders", { params: withKey(params) })).data;
//   },
//   async getSales(params = {}) {
//     return (await apiClient.get("/sales", { params: withKey(params) })).data;
//   },
//   async getStocks(params = {}) {
//     return (await apiClient.get("/stocks", { params: withKey(params) })).data;
//   },
// };
import axios from "axios";

const isProduction = import.meta.env.PROD;

const BASE_URL = isProduction
  ? "/.netlify/functions/proxy"
  : import.meta.env.VITE_API_BASE_URL;

const API_KEY = import.meta.env.VITE_API_KEY;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function withKey(params = {}) {
  return {
    key: API_KEY,
    ...params,
  };
}

export const apiService = {
  async getIncomes(params = {}) {
    if (isProduction) {
      return (
        await apiClient.get("", { params: { endpoint: "incomes", ...params } })
      ).data;
    }
    return (await apiClient.get("/incomes", { params: withKey(params) })).data;
  },

  async getOrders(params = {}) {
    if (isProduction) {
      return (
        await apiClient.get("", { params: { endpoint: "orders", ...params } })
      ).data;
    }
    return (await apiClient.get("/orders", { params: withKey(params) })).data;
  },

  async getSales(params = {}) {
    if (isProduction) {
      return (
        await apiClient.get("", { params: { endpoint: "sales", ...params } })
      ).data;
    }
    return (await apiClient.get("/sales", { params: withKey(params) })).data;
  },

  async getStocks(params = {}) {
    if (isProduction) {
      return (
        await apiClient.get("", { params: { endpoint: "stocks", ...params } })
      ).data;
    }
    return (await apiClient.get("/stocks", { params: withKey(params) })).data;
  },
};
