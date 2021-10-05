import "./OfferPageInfos.scss";
import { useHistory } from "react-router-dom";

const OfferPageInfos = (props) => {
  const { offer, token, handleSend } = props;
  const history = useHistory();

  return (
    <>
      <div className="bloc1">
        <h2>{offer.product_price.toFixed(2)} €</h2>

        {offer.product_details.map((elem, index) => {
          const keys = Object.keys(elem);

          return (
            <p key={index}>
              <span className="grey-txt">{keys[0]} : </span>
              <span>{elem[keys[0]]}</span>
            </p>
          );
        })}
      </div>
      <div className="bloc2">
        <h3>{offer.product_name}</h3>
        <p className="grey-txt">{offer.product_description}</p>
        <div className="avatar">
          {offer.owner.account.avatar && (
            <img
              className="avatar-img"
              src={offer.owner.account.avatar.secure_url}
              alt={offer.owner.account.username}
            />
          )}
          <p className="grey-txt">{offer.owner.account.username}</p>
        </div>
      </div>
      <div className="bloc3">
        {token ? (
          <button
            onClick={() => {
              history.push({
                pathname: "/payment",
                state: {
                  id: offer._id,
                  title: offer.product_name,
                  price: offer.product_price,
                  description: offer.product_description,
                  owner: offer.owner.account.username,
                },
              });
            }}
            className="button-blue-big"
          >
            Acheter
          </button>
        ) : (
          // <Link to="/">
          <button className="button-blue-big" onClick={handleSend}>
            Acheter
          </button>
          // </Link>
        )}
      </div>
    </>
  );
};

export default OfferPageInfos;
