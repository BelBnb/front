import { SexEnum } from "@/common/sex.enum";
import { Neighbours } from "@/common/types/Neighbours";
import ColoredButton from "@/elements/common/buttons/buttons";
import { RootState } from "@/redux/store";
import { User, userInitState } from "@/types/redux/initStates";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

interface NeighbourComponentProps {
  item: Neighbours;
  isMine: boolean;
  isDelete?: {
    label: string;
    onDelete: (id: string) => void;
  };
}

const NeighbourComponent: React.FC<NeighbourComponentProps> = ({ item, isMine, isDelete }) => {
  const user = useSelector<RootState, User>((app) => app.user);
  console.log(item);
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={item.userImage || userInitState.profilePic || user.profilePic} alt="альт" />
      </div>
      <div className={styles.flexDown}>
        <div className={styles.topLine}>
          <div className={styles.topLineName}>
            <span>
              {item.userFirstName} {item.userLastName}
            </span>
            <span>{item.sex === SexEnum.Female ? "Female" : "Male"}</span>
            <span>{new Date().getFullYear() - new Date(item.birthDate).getFullYear()} years</span>
          </div>
        </div>
        <span>{item.description}</span>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.dates}>
          <span>Time period:</span>
          <span>
            <span>From</span>
            <span className={styles.date}>{item.startDate} </span>
          </span>
          <span>
            <span>To</span>
            <span className={styles.date}>{item.endDate} </span>
          </span>
        </div>
        {isMine && isDelete && <ColoredButton coloredLabel="Remove" onClick={() => isDelete.onDelete(item.id)} />}{" "}
      </div>
    </div>
  );
};

export default NeighbourComponent;
