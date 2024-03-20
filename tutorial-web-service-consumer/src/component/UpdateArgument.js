import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const UpdateTutorial = () => {

  let navigate = useNavigate();

  const { idTutorial: myTutorialId, idArgument: myArgumentId } = useParams();
  const [technology, setTechnology] = useState("");
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `http://localhost:8080/rest/api/tutorials/${myTutorialId}/arguments/${myArgumentId}`;

        const response = await fetch(apiUrl);

        if (response.ok) {
          const jsonData = await response.json();
          setTechnology(jsonData.technology);
        } else {
          console.error("Errore durante la richiesta:", response.status);
        }
      } catch (error) {
        console.error("Errore durante la richiesta:", error);
      }
    };
    fetchData();
  }, []);

  const updateTutorial = async (event) => {
    event.preventDefault();

    const formData = {
      id: myArgumentId,
      technology: technology,
      tutorial_id: myTutorialId,
    };

    try {
      const apiUrl = `http://localhost:8080/rest/api/tutorials/${myTutorialId}/arguments`;

      // Esegui la richiesta PUT all'API
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Dati inviati con successo!");
         navigate(`/getArgumentsById/${myTutorialId}`);
      } else {
        console.error("Errore durante l'invio dei dati:", response.status);
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={updateTutorial}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Technology:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTutorial;
