import "./Payment.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useLocation } from "react-router-dom";
const stripePromise = loadStripe(
  "pk_test_51JL5cxEyVQ8jKkAGRP7wZRd9oFunlUM4WbRNftA3cpzkcafb3Wol6hZzn02KKwICJbo1NFclzcaei1fki02gwYhV00BE23j1hT"
);

const Payment = (props) => {
  const { token } = props;
  const location = useLocation();
  //   console.log(location);

  const protectionFees = 0.8;
  const deliveryFees = 2;
  const total = protectionFees + deliveryFees + location.state.price;
  return (
    <div className="payment-container">
      <div className="page-container">
        <h3>Résumé de la commande</h3>
        <div className="bloc1">
          <div>
            <p>
              <span>Commande</span>
              <span>{location.state.price.toFixed(2)} €</span>
            </p>
          </div>
          <div>
            <p>
              <span>Frais de protection acheteurs</span>
              <span>0.80€</span>
            </p>
          </div>
          <div>
            <p>
              <span>Frais de port</span>
              <span>2.00€</span>
            </p>
          </div>
        </div>
        <div className="bloc2">
          <div>
            <p className="bold">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </p>
            <p>
              Il ne vous reste plus qu'un étape pour vous offrir <span className="bold">{location.state.title}</span>.
              Vous allez payer <span className="bold">{total.toFixed(2)} €</span>(frais de protection et frais de port
              inclus).
            </p>
          </div>
        </div>
        <div className="bloc3">
          <Elements stripe={stripePromise}>
            <CheckoutForm token={token} total={total} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
