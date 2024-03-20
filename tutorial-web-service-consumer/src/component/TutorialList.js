import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const TutorialList = () => {
  let navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://localhost:8080/rest/api/tutorials";

        const response = await fetch(apiUrl);

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error("Errore durante la richiesta:", response.status);
        }
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }
    };
    fetchData();
  }, []);

  const removeTutorial = (id) => {
    fetch(`http://localhost:8080/rest/api/tutorials/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(async () => {
        const apiUrl = "http://localhost:8080/rest/api/tutorials";

        const response = await fetch(apiUrl);

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        }
      });
  };

  const tutorialToUpdate = (id) => {
    navigate("/updateTutorial/" + id);
  };

  const getArguments = (id) => {
    navigate("/getArgumentsById/" + id);
  };

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

export default TutorialList;
