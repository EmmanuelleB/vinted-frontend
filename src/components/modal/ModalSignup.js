import "./Modal.scss";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ModalSignup = (props) => {
  const { handleLogin, handleCloseSignupModal, handleOpenLoginModal, setIsSignupModalOpen } = props;

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();

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

  const handleAvatar = (event) => {
    setAvatar(event.target.files[0]);
  };

  const fetchData = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("avatar", avatar);
    try {
      const response = await axios.post("https://my-vinted-app.herokuapp.com/user/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      if (response.data.token) {
        handleLogin(response.data.token);
        setIsSignupModalOpen(false);
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
          <button className="button-close" onClick={handleCloseSignupModal}>
            X
          </button>

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
            <input type="file" accept=".png, .jpeg, .jpg, .gif" onChange={handleAvatar} />
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
            {/* <Link to="/login">
              <p className="redirection">Tu as déjà un compte ? Connecte-toi !</p>
            </Link> */}
            <p onClick={handleOpenLoginModal} className="redirection">
              Tu as déjà un compte ? Connecte-toi !
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalSignup;
