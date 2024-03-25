const PageHeader = ({title, subtitle}) => {
    
    return (
      <div className="row align" style={{ padding: 20 }}>
        <div className="col">
          <h2>{title}</h2>
          <h5>{subtitle}</h5>
        </div>
        <div className="col">
          <button className="btn btn-primary">+</button>
        </div>
      </div>
    );
};

export default PageHeader;