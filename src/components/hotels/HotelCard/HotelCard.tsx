import React from "react";
import { Hotel } from "@/redux/reducers/hotelsReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import styles from "./styles.module.scss";
import Carousel from "../Carousel/Carousel/carousel";
import CarouselItem from "../Carousel/CarouselItem/carouselItem";

type HotelCardProps = {
  hotelItem: Hotel;
  updateHandler: (e: Hotel) => void;
  deleteHandler: (e: Hotel) => void;
};

const HotelCard: React.FC<HotelCardProps> = ({ hotelItem, updateHandler, deleteHandler }) => {
  const user = useSelector<RootState, User>((el) => el.user);
  console.log(user.id, hotelItem.authorId);
  return (
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
          <div>
            <button type="button">
              <a href={`/hotels/${hotelItem.id}`}>Details</a>
            </button>
            <button type="button">Book</button>
          </div>
          {hotelItem.authorId === user.id && (
            <>
              <button type="button" onClick={() => updateHandler(hotelItem)}>
                Update
              </button>
              <button type="button" onClick={() => deleteHandler(hotelItem)}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
