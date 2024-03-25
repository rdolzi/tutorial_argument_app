import { useNavigate } from "react-router-dom";

const PageHeader = ({title, subtitle, func}) => {

      

    return (
      <div className="row align" style={{ padding: 20 }}>
        <div className="col">
          <h2>{title}</h2>
          <h5>{subtitle}</h5>
        </div>
        <div className="col">
            <button className="btn btn-primary" onClick={func}>+</button>
        </div>
      </div>
    );
};

export default PageHeader;