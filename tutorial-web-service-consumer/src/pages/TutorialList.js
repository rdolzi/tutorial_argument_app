import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageHeader from "../component/PageHeader";

import Modal from "../component/Modal";
import { TutorialTable } from "../component";


const TutorialList = () => {
  let navigate = useNavigate();

  // useState() == useState(undefined)
  const [isRemoveModalShowing, setIsRemoveModalShowing] = useState(undefined);
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
    fetch(
      `http://localhost:8080/rest/api/tutorials/${isRemoveModalShowing}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then(async () => {
        const apiUrl = "http://localhost:8080/rest/api/tutorials";

        const response = await fetch(apiUrl);

        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          setData([]);
          console.log("NO ARGUMENTS");
        }
        setIsRemoveModalShowing(undefined);
      });
  };
  const tutorialToUpdate = (id) => {
    navigate("/updateTutorial/" + id);
  };

  const getArguments = (id) => {
    navigate("/getArgumentsById/" + id);
  };

  return (
    <>
      <PageHeader
        title={"Lista tutorial"}
        subtitle={`i tutoria disponibili sono ${data.length}`}
      />
      <TutorialTable
        data={data}
        removeTutorial={setIsRemoveModalShowing}
        tutorialToUpdate={tutorialToUpdate}
        getArguments={getArguments}
      />
      { isRemoveModalShowing !== undefined && <Modal
        confirm={removeTutorial}
        title={"Elimina tutorial"}
        description={"Sei sicuro di voler eliminare il tutorial?"}
        confirmTitle={"Elimina"}
        closeModal={() => setIsRemoveModalShowing(undefined)}
      />}
    </>
  );
};

export default TutorialList;
