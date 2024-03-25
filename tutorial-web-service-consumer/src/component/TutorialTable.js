
const TutorialTable = ({
  data,
  removeTutorial,
  tutorialToUpdate,
  getArguments,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Published</th>
          <th>Update</th>
          <th>Delete</th>
          <th>Arguments</th>
        </tr>
      </thead>
      <tbody>
        {data.map((tutorial) => (
          <tr key={tutorial.id}>
            <td>{tutorial.title}</td>
            <td>{tutorial.description}</td>
            <td>{tutorial.published ? "yes" : "no"}</td>
            <td>
              <button
                className="btn btn-primary mr-2"
                onClick={() => tutorialToUpdate(tutorial.id)}
              >
                Update
              </button>
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => removeTutorial(tutorial.id)}
              >
                Delete
              </button>
            </td>
            <td>
              <button
                className="btn btn-success"
                onClick={() => getArguments(tutorial.id)}
              >
                Arguments
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TutorialTable;