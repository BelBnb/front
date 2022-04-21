import { DialogPreviewType } from "@/types/dialogs";
import React from "react";
import styles from "./styles.module.scss";

const DialogPreview: React.FC<DialogPreviewType> = ({ address, date, lastMessage, pic }) => (
  <div className={styles.previewContainer}>
    <div className={styles.imgContainer}>
      <img src={pic} alt="suka" />
    </div>
    <div className={styles.addressInfo}>
      <span>{address}</span>
      <span>{lastMessage}</span>
    </div>
    <div className={styles.date}>
      <span>{date}</span>
    </div>
  </div>
);

export default DialogPreview;
