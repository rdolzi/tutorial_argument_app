import { Link } from "react-router-dom";

const NavBar = () => {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorialList"} className="nav-link">
                Tutorial List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/addTutorial"} className="nav-link">
                Add Tutorial
              </Link>
            </li>
          </div>
        </nav>
      </div>
    );
};

export default NavBar;