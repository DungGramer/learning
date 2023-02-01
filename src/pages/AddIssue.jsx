import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export default function AddIssue() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addIssue = useMutation(
    (issueBody) =>
      fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(issueBody),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueryData(["issue", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );

  return (
    <div className='add-issue'>
      <h2>Add Issue</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const { title, comment } = event.target.elements;

          if (addIssue.isLoading) return;

          addIssue.mutate({
            title: title.value,
            comment: comment.value,
          });
        }}
      >
        <label htmlFor='title'>Title</label>
        <input type='text' name='title' id='title' placeholder='Title' />
        <label htmlFor='comment'>Comment</label>
        <textarea
          name='comment'
          id='comment'
          cols='30'
          rows='10'
          placeholder='Comment'
        />
        <button type='submit' disabled={addIssue.isLoading}>
          {addIssue.isLoading ? "Adding Issue..." : "Add Issue"}
        </button>
      </form>
    </div>
  );
}
