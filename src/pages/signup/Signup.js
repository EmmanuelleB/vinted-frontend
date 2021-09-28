import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Signup.css";

const Signup = (props) => {
  const { handleLogin } = props;

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post("https://my-vinted-app.herokuapp.com/user/signup", {
        email: `${email}`,
        username: `${username}`,
        phone: `${phone}`,
        password: `${password}`,
      });
      console.log(response.data);

      if (response.data.token) {
        handleLogin(response.data.token);
        history.push("/");
      } else {
        alert("Une erreur est survenue, veuillez réessayer");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 409) {
        alert(error.response.data.message);
      }
    }
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div className="modal">
      <div className="page-container">
        <div className="contactForm">
          <Link to="/">
            <div className="button-close">X</div>
          </Link>
          <h2>S'inscrire</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="inputText"
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsername}
            />
            <br />
            <input className="inputText" type="email" placeholder="Email" value={email} onChange={handleEmail} />
            <br />
            <input
              className="inputText"
              type="tel"
              placeholder="Téléphone"
              pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
              value={phone}
              onChange={handlePhone}
            />
            <br />
            <input
              className="inputText"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePassword}
            />
            <br />
            <input className="inputCheckBox" type="checkbox" />
            <span>S'inscrire à notre newsletter</span>
            <br />
            <p className="conditions">
              En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de
              Vinted. Je confirme avoir au moins 18 ans.
            </p>
            <br />
            <button type="submit" className="button-blue-big">
              S'inscrire
            </button>
            <Link to="/login">
              <p className="redirection">Tu as déjà un compte ? Connecte-toi !</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
