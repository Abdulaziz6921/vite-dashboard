import axios from "axios";

export async function handler(event) {
  try {
    const { endpoint, ...queryParams } = event.queryStringParameters;

    if (!endpoint) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Endpoint is required" }),
      };
    }

    const BASE_URL = "http://109.73.206.144:6969/api"; // your backend API
    const API_KEY = process.env.VITE_API_KEY; // stored in Netlify env

    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: {
        key: API_KEY,
        ...queryParams,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
