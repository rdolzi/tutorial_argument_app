import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../component/Modal";
import ArgumentTable from "../component/ArgumentTable";

const ArgumentList = () => {

let navigate = useNavigate();
const [isRemoveModalShowing, setIsRemoveModalShowing] = useState(undefined);
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

   const removeArgument = (isRemoveModalShowing, idArgument) => {
     fetch(`http://localhost:8080/rest/api/tutorials/arguments/${idArgument}`, {
       method: "DELETE",
     })
       .then((response) => response.json())
       .then(async () => {
         const apiUrl = `http://localhost:8080/rest/api/tutorials/${isRemoveModalShowing}/arguments`;

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
    <>
      <ArgumentTable
        data={data}
        id={id}
        addArgument={addArgument}
        updateArgument={updateArgument}
        removeArgument={setIsRemoveModalShowing}
      />
      {isRemoveModalShowing !== undefined && (
        <Modal
          confirm={removeArgument}
          title={"Elimina Argomento"}
          description={"Sei sicuro di voler eliminare l argomento?"}
          confirmTitle={"Elimina"}
          closeModal={() => setIsRemoveModalShowing(undefined)}
        />
      )}
    </>
  );
};

export default ArgumentList;
