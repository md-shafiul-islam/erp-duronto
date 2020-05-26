import Axios from "axios";

const setJWTToken = (token) => {
  console.log("Run set JWT Token!!!!");
  try {
    if (token) {
      Axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete Axios.defaults.headers.common["Authorization"];
    }
  } catch (error) {
    console.log("Set Axios Header Error: ", error);
  }
};

export default setJWTToken;
