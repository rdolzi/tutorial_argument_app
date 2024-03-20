import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  useEffect(() => {
    navigate("/tutorialList");
  }, [navigate]);

  return <div></div>;
};

export default Home;
