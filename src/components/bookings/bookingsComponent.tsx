import welcomeScreen from "@/assets/images/backgrounds/index.jpg";
import DialogComponent from "@/elements/common/dialog/dialog";
import { useState } from "react";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";

const BookingMain: React.FC = (): JSX.Element => {
  const user = useSelector<RootState, User>((el) => el.user);

  const [isOpen, setOpen] = useState(false);

  return <div></div>;
};
export default BookingMain;
