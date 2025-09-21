const axios = require("axios");

exports.handler = async function (event, context) {
  const { endpoint, ...query } = event.queryStringParameters || {};

  if (!endpoint) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing endpoint" }),
    };
  }

  const BASE_URL = process.env.VITE_API_BASE_URL;
  const API_KEY = process.env.VITE_API_KEY;

  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: { key: API_KEY, ...query },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.error("Proxy error:", err.message);
    return {
      statusCode: err.response?.status || 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
