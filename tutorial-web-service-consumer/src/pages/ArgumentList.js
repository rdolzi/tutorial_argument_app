import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../component/Modal";
import ArgumentTable from "../component/ArgumentTable";
import PageHeader from "../component/PageHeader";

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

   const removeArgument = () => {
     fetch(
       `http://localhost:8080/rest/api/tutorials/arguments/${isRemoveModalShowing}`,
       {
         method: "DELETE",
       }
     )
       .then((response) => response.json())
       .then(async () => {
         const apiUrl = `http://localhost:8080/rest/api/tutorials/${id}/arguments`;

         const response = await fetch(apiUrl);

         if (response.ok) {
           const jsonData = await response.json();
           setData(jsonData);
         }else{
          setData([]);
          console.log("NO ARGUMENTS");
         }

       });
   };

   const updateArgument = (idTutorial, idArgument) => {
     navigate("/tutorial/" + idTutorial + "/argument/" + idArgument);
   };

   const doNavigate = (url) => {
     navigate(url);
   };
   
  return (
    <>
      <PageHeader
        title={"Lista tutorial"}
        subtitle={`i tutoria disponibili sono ${data.length}`}
        func={() => {
          doNavigate(`/addArgument/${id}`);
        }}
      />
      <ArgumentTable
        data={data}
        idTutorial={id}
        addArgument={addArgument}
        updateArgument={updateArgument}
        closeModal={setIsRemoveModalShowing}
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
