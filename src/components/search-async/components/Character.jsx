const Character = ({ title, url }) => {
  return (
    <article className="Character">
      <a href={url}>
        {title}
      </a>
    </article>
  );
};

export default Character;
