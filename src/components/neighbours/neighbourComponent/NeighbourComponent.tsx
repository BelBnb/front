import { SexEnum } from "@/common/sex.enum";
import { Neighbours } from "@/common/types/Neighbours";
import React from "react";
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
  console.log(item);
  return (
    <div className={styles.container}>
      {item.userImage && (
        <div className={styles.imageContainer}>
          <img src={item.userImage} alt="альт" />
        </div>
      )}
      <div className={styles.flexDown}>
        <div className={styles.topLine}>
          <div>
            <span>
              {item.userFirstName} {item.userLastName}
            </span>
            <span>{item.birthDate}</span>
          </div>
          <div className={styles.dates}>
            <span>
              from <span>{item.startDate}</span>
            </span>
            <span>
              to<span>{item.endDate}</span>
            </span>
          </div>
        </div>
        <span>{new Date().getFullYear() - new Date(item.birthDate).getFullYear()} years</span>
        <span>{item.sex === SexEnum.Female ? "F" : "M"}</span>
        <span>{item.description}</span>
        {isMine && isDelete && (
          <button type="button" onClick={() => isDelete.onDelete(item.id)}>
            Remove
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default NeighbourComponent;
