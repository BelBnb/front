import React from "react";
import { Hotel } from "@/redux/reducers/hotelsReducer";

type HotelCardProps = {
  hotelItem: Hotel;
};

const HotelCard: React.FC<HotelCardProps> = ({ hotelItem }) => <div>HotelCard</div>;

export default HotelCard;
