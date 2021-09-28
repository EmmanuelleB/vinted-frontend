import "./CheckoutForm.scss";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CheckoutForm = (props) => {
  const { token, total } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [succeed, setSucceed] = useState(false);

  const location = useLocation();
  console.log(location);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // On récupère ici les données bancaires que l'utilisateur rentre
      const cardElement = elements.getElement(CardElement);
      // On demande un création de token
      // On envoie le token reçu depuis l'API Stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: location.state.owner,
      });
      //   console.log(stripeResponse);
      console.log(stripeResponse.token.id);
      console.log(total);

      // Une fois le token reçu depuis l'API Stripe
      // Requête vers notre serveur
      // On envoie le token reçu depuis l'API Stripe

      const response = await axios.post(
        "https://my-vinted-app.herokuapp.com/payment",
        {
          stripeToken: stripeResponse.token.id,
          price: total,
          title: location.state.title,
        },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setSucceed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {succeed ? (
        <p>Paiement reussi</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button className="button-blue-big" type="submit">
            Pay
          </button>
        </form>
      )}
    </div>
  );
};

export default CheckoutForm;
