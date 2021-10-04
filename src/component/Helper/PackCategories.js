import Axios from "axios";
import { BASE_URL, REQUEST_HEADER } from "../../actions/types";

class PackCategories {
  getAllPackagesCategories() {
    return Axios.get(`${BASE_URL}/package-categories`, {
      headers: REQUEST_HEADER,
    })
      .then((res) => {
        console.log("Success Get All Package Categories!!");
        return res.data;
      })
      .catch((res) => {
        console.log("Error Get All Package Categories!!");
        console.log(res.data);
      });
  }
}

export default new PackCategories();
