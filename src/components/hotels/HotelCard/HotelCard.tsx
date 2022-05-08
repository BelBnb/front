import React from "react";
import { Hotel } from "@/redux/reducers/hotelsReducer";
import styles from "./styles.module.scss";
import Carousel from "../Carousel/Carousel/carousel";
import CarouselItem from "../Carousel/CarouselItem/carouselItem";

type HotelCardProps = {
  hotelItem: Hotel;
};

const HotelCard: React.FC<HotelCardProps> = ({ hotelItem }) => (
  <div className={styles.cardContainer}>
    <Carousel>
      {hotelItem.images.map((el) => (
        <CarouselItem wth="100%">
          <div className={styles.imageContainer}>
            <img src={el} alt="courusel item" />
          </div>
        </CarouselItem>
      ))}
    </Carousel>
    <div className={styles.bottomText}>
      <span className={styles.name}>{hotelItem.name}</span>
      <span className={styles.price}>{hotelItem.price}</span>

      <div className={styles.bottomButtons}>
        <button type="button">
          <a href={`/hotels/${hotelItem.id}`}>Details</a>
        </button>
        <button>Book</button>
      </div>
    </div>
  </div>
);

export default HotelCard;