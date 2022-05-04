import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Hotel } from "@/redux/reducers/hotelsReducer";
import getHotelsThunk from "@/redux/thunks/hotels/getHotelsThunk";
import styles from "./styles.module.scss";

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
          <div>carousel</div>
          <div>
            <span className={styles.price}>{hotel?.price}$</span>
            <span className={styles.price}>{hotel?.name}</span>
            <button type="button" className={styles.outlineButton}>
              Book
            </button>
            <button type="button" className={styles.coloredButton}>
              Text
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticularHotel;
