import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArgumentList = () => {

let navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/rest/api/tutorials/${id}/arguments`;

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

   const addArgument = (id) => {
     navigate("/addArgument/" + id);
   };

   const removeArgument = (idTutorial, idArgument) => {
     fetch(`http://localhost:8080/rest/api/tutorials/arguments/${idArgument}`, {
       method: "DELETE",
     })
       .then((response) => response.json())
       .then(async () => {
         const apiUrl = `http://localhost:8080/rest/api/tutorials/${idTutorial}/arguments`;

         const response = await fetch(apiUrl);

         if (response.ok) {
           const jsonData = await response.json();
           setData(jsonData);
         }
       });
   };

   const updateArgument = (idTutorial, idArgument) => {
     navigate("/tutorial/" + idTutorial + "/argument/" + idArgument);
   };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Technology</th>
          <th>
            <button className="btn btn-success" onClick={() => addArgument(id)}>
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
                onClick={() => removeArgument(id,argument.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ArgumentList;
