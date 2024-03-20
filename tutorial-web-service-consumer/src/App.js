import { Route, Routes } from "react-router-dom";
import { Home, AddTutorial, UpdateTutorial, TutorialList, NavBar, ArgumentList, AddArgument, UpdateArgument } from "./component";

// function App() {
//   return (
//     <div >
//     </div>
//   );
// }

const App = () => {
  return (
    <div>
      <NavBar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tutorialList" element={<TutorialList />} />
          <Route path="/addTutorial" element={<AddTutorial />} />
          <Route path="/updateTutorial/:id" element={<UpdateTutorial />} />
          <Route path="/getArgumentsById/:id" element={<ArgumentList />} />
          <Route path="/addArgument/:id" element={<AddArgument />} />
          <Route path="/tutorial/:idTutorial/argument/:idArgument" element={<UpdateArgument />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
