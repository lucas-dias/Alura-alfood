import axios from "axios";

const v1 = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

export default v1;
