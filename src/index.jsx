import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from "react-router-dom";

import CharacterList from "./components/CharacterList";

import dummyData from "./dummy-data";
import endpoint from "./endpoint";
import useFetch from "./hooks/useFetch";
import { initialState, reducer } from "./store/context";

import "./styles.scss";

const Application = () => {
  const [data, loading, error] = useFetch(endpoint);
  const hits = (data?.hits) || [];
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const { characters } = state;

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={hits} />
          )}
          {error && <p className="error">{error.message}</p>}
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
