import axios from "axios";

const instance = axios.create({
  baseURL: "https://recipelisting-6b405.firebaseio.com/"
});

export default instance;
