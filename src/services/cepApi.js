const axios = require("axios");

const cepApi = axios.create({
  baseURL: "https://brasilapi.com.br/api",
  timeout: 5000,
});

module.exports = cepApi;
