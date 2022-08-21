import { useEffect, useState } from "react";

function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState();

  useEffect(() => {
    setLoading(true);
    setResponse(null);
    setError(null);

    const fetchUrl = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        setResponse(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrl();
  }, []);

  return [response, loading, error];
}

export default useFetch;
