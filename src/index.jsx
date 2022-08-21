import ReactDOM from "react-dom";
import React from "react";
import StarWarsCharacters from "./Star-Wars-Characters";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Grudges from "./grudges-react-state";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router>
    {/* <StarWarsCharacters /> */}
    <Grudges />
  </Router>,
  rootElement
);
