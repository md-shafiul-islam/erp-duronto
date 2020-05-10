import React, { Component } from "react";
import Axios from "axios";

class LoadCountries extends Component {
  getAllcountries() {
    return Axios.get("http://localhost:8085/api/countries");
  }
}

export default new LoadCountries();
