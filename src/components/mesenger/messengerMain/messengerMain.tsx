import React, { useState } from "react";
import MessengerDialogs from "../dialogs/dialogs";
import Dialog from "../singleDialog/dialog";
import styles from "./styles.module.scss";

const MessengerMain = () => {
  const [selectedDialog, setSelectedDialog] = useState("");
  const selectDialog = (e: string) => {
    setSelectedDialog(e);
  };
  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerContainer}>
        <div className={styles.dialogs}>
          <MessengerDialogs selectDialog={selectDialog} />
        </div>
        <div className={styles.selectedDialog}>{selectedDialog && <Dialog />}</div>
      </div>
    </div>
  );
};

export default MessengerMain;
