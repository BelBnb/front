import { Hotel } from "@/redux/reducers/hotelsReducer";
import { RootState } from "@/redux/store";
import getHotelsThunk from "@/redux/thunks/hotels/getHotelsThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HotelCard from "../HotelCard/HotelCard";
import styles from "./styles.module.scss";

const HotelsContainer = () => {
  const hotels = useSelector<RootState, Hotel[]>((app) => app.hotels);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHotelsThunk());
  }, []);
  useEffect(() => {
    console.log("отели", hotels);
  }, [hotels]);
  return (
    <div className={styles.hotelsContainer}>
      <h4 className={styles.headerCaption}>Hotels</h4>
      <div>{hotels.length > 0 && hotels.map((el) => <HotelCard hotelItem={el} />)}</div>
    </div>
  );
};

export default HotelsContainer;
