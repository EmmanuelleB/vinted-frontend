import "./OfferPage.scss";
import axios from "axios";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import OfferPageInfos from "../../components/offerPageInfos/OfferPageInfos";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MobileDetect from "mobile-detect";
import ReactLoading from "react-loading";

const OfferPage = (props) => {
  const { token, handleSend } = props;
  const { id } = useParams();

  const [offer, setOffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://my-vinted-app.herokuapp.com/offer/${id}`);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const deviceType = (req) => {
    let userAgent;
    let deviceType;
    if (req) {
      userAgent = req.headers["user-agent"];
    } else {
      userAgent = navigator.userAgent;
    }
    const md = new MobileDetect(userAgent);
    if (md.tablet()) {
      deviceType = "tablet";
    } else if (md.mobile()) {
      deviceType = "mobile";
    } else {
      deviceType = "desktop";
    }
    return deviceType;
  };

  const pictures = { ...offer.product_image };
  const picturesArray = Object.keys(pictures);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 960 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 960, min: 640 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className="offerPage-container">
      {isLoading ? (
        <div className="center">
          <ReactLoading type="bubbles" color="#0cadb7" height={300} width={150} />
        </div>
      ) : (
        <div className="page-container">
          <>
            <Carousel
              responsive={responsive}
              ssr
              showDots
              autoPlay={deviceType !== "mobile" ? true : false}
              infinite
              containerClass="carousel-container col-1"
              // removeArrowOnDeviceType={["tablet", "mobile"]}
              deviceType={deviceType}
            >
              {picturesArray.map((item, index) => {
                return <img key={index} src={pictures[item].secure_url} alt="offer.product_name" />;
              })}
            </Carousel>
          </>
          <div className="col-2">
            <OfferPageInfos offer={offer} token={token} handleSend={handleSend} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferPage;
