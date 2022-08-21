import { useEffect, useState } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
        console.error(err);
      });
  }, []);

  return [data, loading, error];
}

export default useFetch;
