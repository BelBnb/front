import { DialogPreviewType } from "@/types/dialogs";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

const DialogPreview: React.FC<DialogPreviewType> = ({ address, date, lastMessage, pic, id }) => (
  <Link to={`/messenger/${id}`}>
    <div className={styles.previewContainer}>
      <div className={styles.imgContainer}>
        <img src={pic} alt="avatar" />
      </div>
      <div className={styles.addressInfo}>
        <span>{address}</span>
        <span>{lastMessage}</span>
      </div>
      <div className={styles.date}>
        <span>{date}</span>
      </div>
    </div>
  </Link>
);

export default DialogPreview;
