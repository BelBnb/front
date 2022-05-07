import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Hotel } from "@/redux/reducers/hotelsReducer";
import getHotelsThunk from "@/redux/thunks/hotels/getHotelsThunk";
import styles from "./styles.module.scss";
import Carousel from "../Carousel/Carousel/carousel";
import CarouselItem from "../Carousel/CarouselItem/carouselItem";

const ParticularHotel = () => {
  const hotels = useSelector<RootState, Hotel[]>((app) => app.hotels);
  const [hotel, setHotel] = useState<Hotel>();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getHotelsThunk());
    console.log(params.id);
    if (params.id) {
      setHotel(hotels.find((el) => el.id === params.id));
    }
  }, [params, hotels]);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentContaienr}>
        <div className={styles.columns}>
          <div className={styles.carousel}>
            <Carousel>
              {hotel?.images.map((el) => (
                <CarouselItem wth="620px">
                  <img src={el} alt="pirkol" />
                </CarouselItem>
              ))}
            </Carousel>
          </div>
          <div>
            <span className={styles.price}>{hotel?.price}$</span>
            <span className={styles.name}>{hotel?.name}</span>
            <aside>{hotel?.description}</aside>

            <div className={styles.buttonContainer}>
              <button type="button" className={styles.outlineButton}>
                Book
              </button>
              <button type="button" className={styles.coloredButton}>
                Net blyat film
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularHotel;
