import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddTutorial = () => {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);

  const addTutorial = async (event) => {
    event.preventDefault();

    const formData = {
      title: title,
      description: description,
      published: published,
    };

    try {
      const apiUrl = "http://localhost:8080/rest/api/tutorials";

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
        navigate("/tutorialList");
      } else {
        console.error("Errore durante l'invio dei dati:", response.status);
      }
    } catch (error) {
      console.error("Errore durante la richiesta:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={addTutorial}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="published" className="form-label">
            Published:
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTutorial;
