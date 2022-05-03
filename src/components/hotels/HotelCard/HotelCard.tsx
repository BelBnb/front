import React from "react";
import { Hotel } from "@/redux/reducers/hotelsReducer";

type HotelCardProps = {
  hotelItem: Hotel;
};

const HotelCard: React.FC<HotelCardProps> = ({ hotelItem }) => <div>{JSON.stringify(hotelItem)}</div>;

export default HotelCard;
