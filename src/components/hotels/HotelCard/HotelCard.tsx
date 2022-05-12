import React from "react";
import { Hotel } from "@/redux/reducers/hotelsReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import Carousel from "../Carousel/Carousel/carousel";
import CarouselItem from "../Carousel/CarouselItem/carouselItem";
import { RoleEnum } from "@/common/role.enum";

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
              <Link to={`/hotel/${hotelItem.id}`}>Details</Link>
            </button>
            <button type="button">Book</button>
          </div>
          {(hotelItem.authorId === user.id || user.role === RoleEnum.Admin) && (
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
