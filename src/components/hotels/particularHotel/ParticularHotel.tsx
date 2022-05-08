import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import getHotelsThunk from "@/redux/thunks/hotels/getHotelsThunk";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import { RangeKeyDict, DateRange } from "react-date-range";
import { Hotel, User } from "@/types/redux/initStates";
import { diffInDays } from "@/helpers/dateDiffHelper";
import bookingApi from "@/api/booking/bookingApi";
import styles from "./styles.module.scss";
import Carousel from "../Carousel/Carousel/carousel";
import CarouselItem from "../Carousel/CarouselItem/carouselItem";
import "./overrideStyles.scss";
import { toast } from "react-toastify";
import { createBookingDto } from "@/types/dto/booking/bookingDtos";
import FeedbackComponent from "@/components/feedback/feedbackComponent";

const ParticularHotel = () => {
  const { hotels, user } = useSelector<RootState, { hotels: Hotel[]; user: User }>((app) => ({
    hotels: app.hotels,
    user: app.user,
  }));

  const [selection, setSelecton] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [hotel, setHotel] = useState<Hotel>();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelecton(ranges?.selection);
  };

  useEffect(() => {
    dispatch(getHotelsThunk());
  }, []);

  const handleBook = async () => {
    if (!user.authorized || !hotel) {
      return;
    }
    const bookingDto: createBookingDto = {
      userId: user.id,
      wannaNeighbour: false,
      hotelId: hotel?.id,
      startDate: selection.startDate,
      endDate: selection.endDate,
    };
    const result = await bookingApi.createBooking(bookingDto);
    if (result) {
      toast.success("Booked successfully");
    }

    console.log(result);
  };

  useEffect(() => {
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
            <div className={styles.sepLine}>
              <span className={styles.price}>{hotel?.price}$</span>
              <span className={styles.name}>{hotel?.name}</span>
            </div>
            <aside>{hotel?.description}</aside>
            <CoolLabel>Booking </CoolLabel>
            <DateRange ranges={[selection]} rangeColors={["#2d2d2d"]} onChange={(e) => handleSelect(e)} />
            <div className={styles.flexDown}>
              <span>Rent duration: {diffInDays(selection.startDate, selection.endDate)} day</span>
              {hotel && (
                <span>You would spend {diffInDays(selection.startDate, selection.endDate) * hotel?.price}$</span>
              )}
            </div>
            <div className={styles.buttonContainer}>
              <button type="button" className={styles.outlineButton} onClick={() => handleBook()}>
                Book
              </button>
              <button type="button" className={styles.coloredButton}>
                Net blyat film
              </button>
            </div>
          </div>
        </div>
        <div className={styles.feedbackContainer}>{hotel && <FeedbackComponent entityId={hotel.id} />}</div>
      </div>
    </div>
  );
};

export default ParticularHotel;
