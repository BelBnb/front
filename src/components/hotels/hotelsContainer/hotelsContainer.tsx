import { Hotel } from "@/redux/reducers/hotelsReducer";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import HotelCard from "../HotelCard/HotelCard";
import styles from "./styles.module.scss";

const HotelsContainer = () => {
  const hotels = useSelector<RootState, Hotel[]>((app) => app.hotels);

  return (
    <div className={styles.hotelsContainer}>
      <h4 className={styles.headerCaption}>Hotels</h4>
      <div>
        {hotels.map((el) => (
          <HotelCard hotelItem={el} />
        ))}
      </div>
    </div>
  );
};

export default HotelsContainer;
