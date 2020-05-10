import React, { Component } from "react";
import Axios from "axios";

class PackCategories extends Component {
  getAllPackagesCategories() {
    return Axios.get("http://localhost:8085/api/package-categories")
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
