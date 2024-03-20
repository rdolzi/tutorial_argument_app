import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AddArgument } from ".";

const AddTutorial = () => {
    
  let navigate = useNavigate();
  const { id } = useParams();
  const [technology, setTechnology] = useState("");

  const addArgument = async (event) => {
    event.preventDefault();

    const formData = {
      technology: technology,
      tutorial_id: id,
    };

    try {
      const apiUrl = `http://localhost:8080/rest/api/tutorials/${id}/arguments`;

      // Esegui la richiesta POST all'API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Dati inviati con successo!");
        navigate(`/getArgumentsById/${id}`);
      } else {
        console.error("Errore durante l'invio dei dati:", response.status);
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={addArgument}>
        <div className="mb-3">
          <label htmlFor="technology" className="form-label">
            Technology:
          </label>
          <input
            type="text"
            className="form-control"
            id="technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <div>
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-apple"
                viewBox="0 0 16 16"
              >
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
                <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" />
              </svg>
            </div>
            <div>Add</div>
          </div>
        </button>
      </form>
    </div>
  );
};

export default AddTutorial;
