import "./heroHeader.scss";
import { Link } from "react-router-dom";
const HeroHeader = (props) => {
  const { token, handleSend } = props;
  return (
    <>
      <div className="hero-container">
        <div className="tearImage">
          <div className="page-container">
            <div className="title-container">
              <h1>Prêts à faire du tri dans vos placards ?</h1>
              {token ? (
                <Link to="/offer/publish">
                  <button className="button-blue-big">Vends tes articles</button>
                </Link>
              ) : (
                <button className="button-blue-big" onClick={handleSend}>
                  Vends tes articles
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="title-container-xs">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        {token ? (
          <Link to="/offer/publish">
            <button className="button-blue-big">Vends tes articles</button>
          </Link>
        ) : (
          <button className="button-blue-big" onClick={handleSend}>
            Vends tes articles
          </button>
        )}
      </div>
    </>
  );
};

export default HeroHeader;
