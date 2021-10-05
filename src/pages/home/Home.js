import "./Home.scss";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as qs from "qs";
import ReactLoading from "react-loading";

import HeroHeader from "../../components/heroHeader/heroHeader";
import Offer from "../../components/offer/Offer";

const Home = (props) => {
  const { isLoading, setIsLoading, data, setData, title, sort, finalValue, handleSend, token } = props;

  const location = useLocation();
  const params = qs.parse(location.search.substring(1));

  const page = params.page;

  const offersByPage = 20;
  const numberOfPage = Math.ceil(data.count / offersByPage);
  const pagination = [];
  for (let i = 0; i < numberOfPage; i++) {
    pagination.push(
      <Link key={i} to={`?page=${i + 1}&offersByPage=${offersByPage}`}>
        {i + 1}
      </Link>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://my-vinted-app.herokuapp.com/offers?page=${page}&offersByPage=${offersByPage}&title=${title}&sort=${
            sort ? "price-asc" : "price-desc"
          }&priceMin=${finalValue[0]}&priceMax=${finalValue[1]}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page, offersByPage, title, sort, finalValue, setData, setIsLoading]);

  return isLoading ? (
    <div className="center">
      <ReactLoading type="bubbles" color="#0cadb7" height={300} width={150} />
    </div>
  ) : (
    <div>
      <HeroHeader token={token} handleSend={handleSend} />
      <div className="page-container">
        <div className="pagination">{pagination}</div>
        <div className="offers-container">
          {data.offers.map((offer) => {
            return (
              <Link to={`/offer/${offer._id}`} key={offer._id} className="offer-container">
                <Offer offer={offer} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
