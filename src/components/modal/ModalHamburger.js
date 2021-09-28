import "./ModalHamburger.scss";
import { Link, useLocation } from "react-router-dom";
const ModalHamburger = (props) => {
    const {token ,handleSend, handleOpenSignupModal, handleOpenLoginModal, handleLogOut, handleCloseHamburgerModal} = props;
  return (
 <div className="modal">
    <div className="page-container">
        <div className="menuForm">
       
      
             {token ? null : (
                  <button onClick={handleOpenSignupModal} className="button-border-blue">
                    S'inscrire
                  </button>
                )}

               {token ? (
                  <button onClick={handleLogOut} className="button-pink">
                    Se Déconnecter
                  </button>
                ) : (
                  <button onClick={handleOpenLoginModal} className="button-border-blue">
                    Se connecter
                  </button>
                )}
               {token ? (
                <Link to="/offer/publish">
                  <button className="button-blue" onClick={handleCloseHamburgerModal}>Vends tes articles</button>
                </Link>
              ) : (
                <button className="button-blue" onClick={handleSend}>
                  Vends tes articles
                </button>
              )}
        </div>
    
    </div>
  </div>
  )

  
}

export default ModalHamburger;