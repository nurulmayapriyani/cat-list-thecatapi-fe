import axios from "axios";

const API_URL = "https://api.thecatapi.com/v1"

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "x-api-key": process.env.REACT_APP_CAT_API_KEY,
  },
});

export const API_IMG = "https://cdn2.thecatapi.com/images/"