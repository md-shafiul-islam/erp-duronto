import React, { Component } from "react";
import Axios from "axios";

const categories = null;
class Loadcategory extends Component {
  getAllCategories = async () => {
    await Axios.get("http://localhost:8085/api/categories")
      .then((res) => {
        console.log("Success Categories Loading... ", res);
        categories = res.data;
      })
      .catch((res) => {
        console.log("Error Categories Loading... ", res);
      });

    return categories;
  };

  render() {
    return <div></div>;
  }
}

export default Loadcategory;
