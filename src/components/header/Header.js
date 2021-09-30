import "./Header.scss";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Range, getTrackBackground } from "react-range";
import Modal from "react-modal";

import ModalSignup from "../modal/ModalSignup";
import ModalLogin from "../modal/ModalLogin";
import ModalHamburger from "../modal/ModalHamburger";
import Switchbar from "../switchbar/Switchbar";

const Header = (props) => {
  const {
    isHamburgerModalOpen,
    isSignupModalOpen,
    setIsSignupModalOpen,
    isLoginModalOpen,
    setIsLoginModalOpen,
    handleOpenHamburgerModal,
    handleCloseHamburgerModal,
    handleOpenSignupModal,
    handleCloseSignupModal,
    handleOpenLoginModal,
    handleCloseLoginModal,
    handleSend,
    handleLogOut,
    token,
    handleLogin,
    title,
    setTitle,
    sort,
    setSort,
    values,
    setValues,
    setFinalValue,
  } = props;

  //FILTERS

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleSort = (event) => {
    setSort(event.target.checked);
  };

  return (
    <>
      <Modal
        isOpen={isSignupModalOpen}
        onRequestClose={handleCloseSignupModal}
        ariaHideApp={false}
        overlayClassName="overlay"
        className="modal"
      >
        <ModalSignup
          handleLogin={handleLogin}
          handleCloseSignupModal={handleCloseSignupModal}
          handleOpenLoginModal={handleOpenLoginModal}
          setIsSignupModalOpen={setIsSignupModalOpen}
        />
      </Modal>

      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={handleCloseLoginModal}
        ariaHideApp={false}
        overlayClassName="overlay"
        className="modal"
      >
        <ModalLogin
          handleLogin={handleLogin}
          handleCloseLoginModal={handleCloseLoginModal}
          handleOpenSignupModal={handleOpenSignupModal}
          setIsLoginModalOpen={setIsLoginModalOpen}
        />
      </Modal>

      <Modal
        isOpen={isHamburgerModalOpen}
        handleCloseLoginModal={handleCloseHamburgerModal}
        ariaHideApp={false}
        overlayClassName="overlayP"
        className="modalP"
      >
        <ModalHamburger
          token={token}
          handleSend={handleSend}
          handleOpenSignupModal={handleOpenSignupModal}
          handleOpenLoginModal={handleOpenLoginModal}
          handleLogOut={handleLogOut}
          handleCloseHamburgerModal={handleCloseHamburgerModal}
        />
      </Modal>

      <header>
        <div className="page-container">
          <div className="line1">
            <Link to="/">
              <img src={logo} alt="logo-vinted" />
            </Link>
            <div className="search-container">
              <div className="search-item">
                <input type="text" placeholder="Recherche des articles" value={title} onChange={handleTitle} />
                <FontAwesomeIcon icon="search" className="icon-search" />
              </div>
              <div className="filters-items">
                <div className="switch-bar-container">
                  <span className="title">Trier par :</span> <Switchbar sort={sort} handleSort={handleSort} />
                </div>
                <div className="range-bar-container">
                  <span className="title">Prix entre :</span>
                  <div className="range">
                    <Range
                      step={5}
                      min={0}
                      max={300}
                      values={values}
                      onChange={(value) => {
                        setValues(value);
                      }}
                      onFinalChange={(values) => {
                        setFinalValue(values);
                      }}
                      renderTrack={({ props, children }) => {
                        return (
                          <div
                            className="bar-range"
                            {...props}
                            style={{
                              background: getTrackBackground({
                                values: values,
                                colors: ["rgba(172, 169, 169, 0.4)", "#09b0ba", "rgba(172, 169, 169, 0.4)"],
                                min: 0,
                                max: 300,
                              }),
                            }}
                          >
                            {children}
                          </div>
                        );
                      }}
                      renderThumb={({ props }) => {
                        return (
                          <div className="cursor" {...props}>
                            <div className="price">{`${values[props.key]}€`}</div>
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="button-container">
              <div className="logger-container">
                {/* <Link to="/signup">{token ? null : <button className="button-border-blue">S'inscrire</button>}</Link> */}
                {token ? null : (
                  <button onClick={handleOpenSignupModal} className="button-border-blue">
                    S'inscrire
                  </button>
                )}

                {/* 
              <Link to="/login">
                {token ? (
                  <button onClick={handleLogOut} className="button-pink">
                    Se Déconnecter
                  </button>
                ) : (
                  <button className="button-border-blue">Se connecter</button>
                )}
              </Link> */}

                {token ? (
                  <button onClick={handleLogOut} className="button-pink">
                    Se Déconnecter
                  </button>
                ) : (
                  <button onClick={handleOpenLoginModal} className="button-border-blue">
                    Se connecter
                  </button>
                )}
              </div>
              {token ? (
                <Link to="/offer/publish">
                  <button className="button-blue">Vends tes articles</button>
                </Link>
              ) : (
                <button className="button-blue" onClick={handleSend}>
                  Vends tes articles
                </button>
              )}
            </div>
            {isHamburgerModalOpen ? (
              <FontAwesomeIcon icon="times" className="icon-bars" onClick={handleCloseHamburgerModal} />
            ) : (
              <FontAwesomeIcon icon="bars" className="icon-bars" onClick={handleOpenHamburgerModal} />
            )}
          </div>
          <div className="line2">
            <div className="search-item">
              <input type="text" placeholder="Recherche des articles" value={title} onChange={handleTitle} />
              <FontAwesomeIcon icon="search" className="icon-search" />
            </div>
          </div>
          <div className="line3">
            <div className="switch-bar-container">
              <span className="title">Trier par :</span> <Switchbar sort={sort} handleSort={handleSort} />
            </div>
            <div className="range-bar-container">
              <span className="title">Prix entre :</span>
              <div className="range">
                <Range
                  step={5}
                  min={0}
                  max={300}
                  values={values}
                  onChange={(value) => {
                    setValues(value);
                  }}
                  onFinalChange={(values) => {
                    setFinalValue(values);
                  }}
                  renderTrack={({ props, children }) => {
                    return (
                      <div
                        className="bar-range"
                        {...props}
                        style={{
                          background: getTrackBackground({
                            values: values,
                            colors: ["rgba(172, 169, 169, 0.4)", "#09b0ba", "rgba(172, 169, 169, 0.4)"],
                            min: 0,
                            max: 300,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    );
                  }}
                  renderThumb={({ props }) => {
                    return (
                      <div className="cursor" {...props}>
                        <div className="price">{`${values[props.key]}€`}</div>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
