import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CoolLabel from "@/elements/common/coolLabel/coolLabel";
import { DateRange, RangeKeyDict } from "react-date-range";
import { Hotel, User } from "@/types/redux/initStates";
import { diffInDays } from "@/helpers/dateDiffHelper";
import bookingApi from "@/api/booking/bookingApi";
import { toast } from "react-toastify";
import { createBookingDto } from "@/types/dto/booking/bookingDtos";
import FeedbackComponent from "@/components/feedback/feedbackComponent";
import Carousel from "../Carousel/Carousel/carousel";
import CarouselItem from "../Carousel/CarouselItem/carouselItem";
import "./overrideStyles.scss";
import styles from "./styles.module.scss";
import ColoredButton from "@/elements/common/buttons/buttons";
import OutlinedButton from "@/elements/common/buttons/outlinedButton";
import BookedPeople from "../bookedPeople/BookedPeople";
import neighboursApi from "@/api/neighbours/neighboursApi";
import { createNeighbourDto } from "@/types/dto/neighbours/createNeighbourDto";
import hotelsApi from "@/api/hotels/hotelsApi";
import { RoleEnum } from "@/common/role.enum";

const ParticularHotel = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  useEffect(async () => {
    const payload = await hotelsApi.getAllHotels();
    const res: Hotel[] = Object.keys(payload.data).map((el) => payload.data[el]);
    setHotels(res || []);
  }, []);

  const { user } = useSelector<RootState, { user: User }>((app) => ({
    user: app.user,
  }));

  const [selection, setSelecton] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [hotel, setHotel] = useState<Hotel>();

  const [wannaNeighbour, setWannaNeigbour] = useState<boolean>(false);
  const [neighbourDescription, setNeighbourDescription] = useState("");

  const params = useParams();

  const handleSelect = (ranges: RangeKeyDict) => {
    setSelecton(ranges?.selection);
  };

  const handleBook = async () => {
    if (!user.authorized || !hotel) {
      return;
    }
    const bookingDto: createBookingDto = {
      userId: user.id,
      isActive: true,
      hotelId: hotel?.id,
      startDate: selection.startDate,
      endDate: selection.endDate,
    };

    toast.promise(bookingApi.createBooking(bookingDto), {
      pending: "Booking in progress",
      success: "Booked successfully!",
      error: {
        render({ data }) {
          return data.message[0] || data.message;
        },
      },
    });
  };

  const handleNeighbour = async () => {
    if (wannaNeighbour) {
      const neighbourDto: createNeighbourDto = {
        userId: user.id,
        startDate: selection.startDate,
        endDate: selection.endDate,
        city: hotel?.city,
        description: neighbourDescription,
      };
      toast.promise(neighboursApi.createNeighboursRequest(neighbourDto), {
        pending: "Loading",
        success: "Neighbour request created successfully. You can find it on neighbours page!",
        error: {
          render({ data }) {
            return data.message[0] || data.message;
          },
        },
      });
    }
  };

  useEffect(() => {
    if (params.id) {
      setHotel(hotels.find((el) => el.id === params.id));
    }
    console.log(hotels);
    console.log(hotels.find((el) => el.id === params.id));
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
          <div className={styles.rightCol}>
            <div className={styles.sepLine}>
              <span className={styles.price}>{hotel?.price}$</span>
              <span className={styles.name}>{hotel?.name}</span>
              <span className={styles.city}>City: {hotel?.city}</span>
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
              <OutlinedButton outlineLabel="Book" onClick={handleBook} />
              <ColoredButton
                coloredLabel={!wannaNeighbour ? "Find neighbour?" : "Hide neighbours finding"}
                onClick={() => {
                  setWannaNeigbour((s) => !s);
                }}
              />
              {wannaNeighbour && (
                <div className={styles.findNeighboursContent}>
                  <textarea
                    placeholder="Share aims of your visit: "
                    name="text"
                    value={neighbourDescription}
                    onChange={(event) => setNeighbourDescription(event?.target?.value || "")}
                  />
                  <OutlinedButton outlineLabel="Find!" onClick={handleNeighbour} />
                </div>
              )}
            </div>
            <CoolLabel>Feedback</CoolLabel>
            <div className={styles.feedbackContainer}>{hotel && <FeedbackComponent entityId={hotel.id} />}</div>
          </div>
        </div>
        {(hotel?.authorId === user.id || user.role === RoleEnum.Admin) && <BookedPeople />}
      </div>
    </div>
  );
};

export default ParticularHotel;
