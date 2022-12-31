import useLabelsData from "../helpers/useLabelsData";

export default function Label({ label }) {
  const labelsQuery = useLabelsData();
  if (labelsQuery.isLoading) return null;
  const labelObj = labelsQuery.data.find(
    (queryLabel) => queryLabel.id === label
  );
  if (!labelObj) return null;

  return (
    <span key={label} className={`label ${labelObj.color}`}>
      {labelObj.name}
    </span>
  );
}
