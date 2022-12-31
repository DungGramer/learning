import { useQuery } from "react-query";

export default function useLabelsData() {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );

  return labelsQuery;
}
