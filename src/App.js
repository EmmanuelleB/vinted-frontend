// import "./App.css";

import "./App.scss";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import OfferPage from "./pages/offerPage/OfferPage";
import Publish from "./pages/publish/Publish";
import Payment from "./pages/payment/Payment";
import Footer from "./components/footer/Footer";
// import Signup from "./pages/signup/Signup";
// import Login from "./pages/login/Login";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
require("dotenv").config();

library.add(faSearch, faBars, faTimes);

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState(false);
  //RANGE-BAR
  const [values, setValues] = useState([10, 100]);
  const [finalValue, setFinalValue] = useState([0, 100]);

  const [token, setToken] = useState(Cookies.get("token") || "");

  const handleLogin = (token) => {
    Cookies.set("token", token);
    setToken(token);
  };

  const handleLogOut = () => {
    Cookies.remove("token");
    setToken("");
  };

  //MODAL
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [isHamburgerModalOpen, setIsHamburgerModalOpen] = useState(false);

  const handleOpenHamburgerModal = () => {
    setIsHamburgerModalOpen(true);
  };
  const handleCloseHamburgerModal = () => {
    setIsHamburgerModalOpen(false);
  };

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
    if (isLoginModalOpen || isHamburgerModalOpen) {
      setIsLoginModalOpen(false);
      setIsHamburgerModalOpen(false);
    }
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    if (isSignupModalOpen || isHamburgerModalOpen) {
      setIsSignupModalOpen(false);
      setIsHamburgerModalOpen(false);
    }
  };
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSend = () => {
    handleOpenLoginModal();
  };

  return (
    <Router>
      <Header
        token={token}
        handleLogOut={handleLogOut}
        handleLogin={handleLogin}
        isSignupModalOpen={isSignupModalOpen}
        setIsSignupModalOpen={setIsSignupModalOpen}
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
        handleOpenSignupModal={handleOpenSignupModal}
        handleOpenHamburgerModal={handleOpenHamburgerModal}
        handleCloseHamburgerModal={handleCloseHamburgerModal}
        isHamburgerModalOpen={isHamburgerModalOpen}
        handleCloseSignupModal={handleCloseSignupModal}
        handleOpenLoginModal={handleOpenLoginModal}
        handleCloseLoginModal={handleCloseLoginModal}
        handleSend={handleSend}
        title={title}
        setTitle={setTitle}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        sort={sort}
        setSort={setSort}
        values={values}
        setValues={setValues}
        setFinalValue={setFinalValue}
      />
      <div>
        <Switch>
          <Route path="/payment">
            <Payment token={token} />
          </Route>
          <Route path="/offer/publish">
            <Publish token={token} />
          </Route>
          {/* <Route path="/signup">
            <Signup handleLogin={handleLogin} />
          </Route>
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route> */}
          <Route path="/offer/:id">
            <OfferPage token={token} handleSend={handleSend} />
          </Route>
          <Route exact path="/">
            <Home
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              data={data}
              setData={setData}
              title={title}
              sort={sort}
              finalValue={finalValue}
              token={token}
              handleSend={handleSend}
            />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
