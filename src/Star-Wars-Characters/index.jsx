import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";

import CharacterList from "./components/CharacterList";
import CharacterView from "./components/CharacterView";

import dummyData from "./dummy-data";
import endpoint from "./endpoint";
import useFetch from "./hooks/useFetch";
import useThunkReducer from "./hooks/useThunkReducer";
import { initialState, reducer } from "./store/context";

import "./styles.scss";

const fetchHits = (dispatch) => {
  dispatch({ type: "LOADING" });

  fetch(endpoint)
    .then((res) => res.json())
    .then((res) =>
      dispatch({
        type: "RESPONSE_COMPLETE",
        payload: {
          response: res.hits,
        },
      })
    )
    .catch((error) => dispatch({ type: "ERROR", payload: { error } }));
};

const StarWarsCharacters = () => {
  // const [data, loading, error] = useFetch(endpoint);
  // const hits = (data?.hits) || [];
  const [state, dispatch] = useThunkReducer(reducer, initialState);
  const { result, loading, error } = state;
  console.log(`📕 result - 38:index.jsx \n`, result);

  useEffect(() => {
    dispatch((dispatch) => {});
  }, [dispatch]);

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          <button onClick={() => dispatch(fetchHits)}>Fetch Hits</button>
          <CharacterList characters={result} />
        </section>
        <section className="CharacterView">
          <Route path="/characters/:id" component={CharacterView} />
        </section>
      </main>
    </div>
  );
};

export default StarWarsCharacters;