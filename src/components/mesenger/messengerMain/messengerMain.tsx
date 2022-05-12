import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessengerDialogs from "../dialogs/dialogs";
import Dialog from "../singleDialog/dialog";
import styles from "./styles.module.scss";

const MessengerMain = () => {
  const [selectedDialog, setSelectedDialog] = useState("");
  const selectDialog = (e: string) => {
    setSelectedDialog(e);
  };
  const params = useParams<{ id: string }>();
  useEffect(() => {}, [params]);

  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerContainer}>
        <div className={styles.dialogs}>
          <MessengerDialogs selectDialog={selectDialog} />
        </div>
        {params && params.id && (
          <div className={styles.selectedDialog}>
            <Dialog id={params.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerMain;
