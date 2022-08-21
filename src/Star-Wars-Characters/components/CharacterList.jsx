import React from "react";

import CharacterListItem from "./CharacterListItem";

const CharacterList = ({ characters = [] }) => {
  return (
    <section className="CharacterList">
      {characters.map(
        (character) =>
          character.url &&
          character.title && (
            <CharacterListItem key={character.objectID} character={character} />
          )
      )}
    </section>
  );
};

export default CharacterList;
