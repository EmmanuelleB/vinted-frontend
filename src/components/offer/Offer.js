import "./Offer.scss";
const Offer = (props) => {
  const { offer } = props;

  const sizeOffer = (array) => {
    for (let i = 0; i < array.length; i++) {
      const keys = Object.keys(array[i]); //["marque"]["état"]...

      if (keys[0] === "TAILLE") {
        return array[i][keys[0]];
      }
    }
  };
  const brandOffer = (array) => {
    for (let i = 0; i < array.length; i++) {
      const keys = Object.keys(array[i]); //["marque"]["état"]...

      if (keys[0] === "MARQUE") {
        return array[i][keys[0]];
      }
    }
  };

  return (
    <>
      <div className="userName">
        {offer.owner.account.avatar && (
          <img className="avatar" src={offer.owner.account.avatar.secure_url} alt={offer.owner.account.username} />
        )}
        <p>
          <span className="grey-txt">{offer.owner.account.username}</span>
        </p>
      </div>

      <img className="offer-product" src={offer.product_image.picture1.secure_url} alt={offer.product_name} />
      <p>{offer.product_price} €</p>
      <p className="grey-txt">{sizeOffer(offer.product_details)}</p>
      <p className="grey-txt">{brandOffer(offer.product_details)}</p>
      {/* {offer.product_details.map((elem, index) => {
        const keys = Object.keys(elem); 
        console.log(keys);
        return (
          {(keys[0] === "TAILLE") ? 
          (<p key={index}>{elem[index][keys[0]]}</p>) : null
        }
        );
      })} */}
    </>
  );
};

export default Offer;
