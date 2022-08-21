import React from "react";

import { NavLink } from "react-router-dom";

const CharacterListItem = ({ character }) => {
  const { url, title } = character;

  return (
    <article className="CharacterListItem">
      <NavLink
        className="CharacterListItemLink"
        to={{ pathname: url }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </NavLink>
    </article>
  );
};

export default CharacterListItem;
