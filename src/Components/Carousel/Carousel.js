import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../Config/Config";

import "./Carousel.css";

const REACT_APP_API_KEY = '1d3f8a1c0198093b711a7de4dd647d9e';

const handleDragStart = (e) => e.preventDefault();

const Gallery = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem__img"
      />
      <b className="carouselItem__txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadData = async () => {
        try {
            const respone = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`, { cancelToken: source.token });
            setCredits(respone.data.cast);
        }
        catch (error) {
            if (axios.isCancel(error)) {
                console.log('caught cancel');
            } else {
                throw error;
            }
        }
    };

    loadData();
    return () => {
        source.cancel()
    };
}, [credits, id, media_type]);

  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
};

export default Gallery;