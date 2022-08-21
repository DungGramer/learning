import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import CharacterList from "./components/CharacterList";

import dummyData from "./dummy-data";
import endpoint from "./endpoint";
import { initialState, reducer } from "./store/context";

import "./styles.scss";

const Application = () => {
  const [characters, setCharacters] = useState(dummyData);
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { characters } = state;

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => setCharacters(response.hits));
  }, [characters]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <CharacterList characters={characters} />
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement
);
