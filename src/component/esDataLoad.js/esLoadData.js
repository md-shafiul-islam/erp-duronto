import React, { Component } from "react";
import Axios from "axios";

class EsLoadData extends Component {
  constructor(props) {
    super(props);
  }

  getCountries = async () => {
    //Load Countries Start
    let countries = [];
    await Axios.get("http://localhost:8085/api/countries")

      .then((res) => {
        console.log("Success Get All Countries !! Axios Add Pack");
        console.log(res.data);
        res.data.map((count) => {
          console.log("From Axios: id. " + count.id + " Name: " + count.name);

          countries.push(count);
        });

        return countries;
      })
      .catch((response) => {
        console.log("Error: Loadin Countries !!");
        console.log(response);
        return null;
      });
    //Load Countries End
  };
}

export default new EsLoadData();
