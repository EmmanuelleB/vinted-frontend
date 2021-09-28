import "./Modal.scss";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ModalLogin = (props) => {
  const { handleLogin, handleCloseLoginModal, handleOpenSignupModal, setIsLoginModalOpen } = props;

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("https://my-vinted-app.herokuapp.com/user/login", {
        email: `${email}`,
        password: `${password}`,
      });
      console.log(response.data);

      if (response.data.token) {
        handleLogin(response.data.token);
        setIsLoginModalOpen(false);
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 401 || error.response.status === 400) {
        alert("Mauvais email et/ou mot de passe");
      }
    }
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="modal">
      <div className="page-container">
        <div className="contactForm">
          <button className="button-close" onClick={handleCloseLoginModal}>
            X
          </button>
          <h2>Se connecter</h2>
          <form onSubmit={handleSubmit}>
            <input className="inputText" type="email" placeholder="Email" value={email} onChange={handleEmail} />
            <br />

            <input
              className="inputText"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePassword}
            />
            <br />
            <button type="submit" className="button-blue-big">
              Se connecter
            </button>
            {/* <Link to="/signup">
              <p className="redirection">Pas encore de compte ? Inscris-toi !</p>
            </Link> */}
            <p onClick={handleOpenSignupModal} className="redirection">
              Pas encore de compte ? Inscris-toi !
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
