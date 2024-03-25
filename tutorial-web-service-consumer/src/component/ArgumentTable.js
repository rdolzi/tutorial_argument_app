const ArgumentTable = ({
    data,
    id,
    addArgument,
    updateArgument,
    removeArgument
}) =>{

    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Technology</th>
              <th>
                <button
                  className="btn btn-success"
                  onClick={() => addArgument(id)}
                >
                  Add Argument
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((argument) => (
              <tr key={argument.id}>
                <td>{argument.id}</td>
                <td>{argument.technology}</td>
                <td></td>
                <td>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => updateArgument(id, argument.id)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeArgument(id, argument.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
};

export default ArgumentTable;