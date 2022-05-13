import { DialogPreviewType } from "@/types/dialogs";
import React, { useState } from "react";
import DialogPreview from "./dialogPreview/dialogPreview";
import styles from "./styles.module.scss";
import { User } from "@/types/redux/initStates";

interface MessengerDialogProps {
  selectDialog: (e: string) => void;
  dialogs: [{ from: string; to: string; id: string; companion: User }];
}

const MessengerDialogs: React.FC<MessengerDialogProps> = ({ selectDialog, dialogs }) => {
  const [mappedDialogs, setMappedDialogs] = useState();

  return (
    <div className={styles.dialogsContainer}>
      {dialogs.map((el) => (
        <DialogPreview
          id={el.companion.id}
          address={el.companion.firstName}
          date={""}
          pic={el.companion.profilePic}
          lastMessage={""}
        />
      ))}
    </div>
  );
};

export default MessengerDialogs;
