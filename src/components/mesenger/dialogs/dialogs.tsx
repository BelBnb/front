import React, { useState } from "react";
import { User, userInitState } from "@/types/redux/initStates";
import DialogPreview from "./dialogPreview/dialogPreview";
import styles from "./styles.module.scss";

interface MessengerDialogProps {
  selectDialog: (e: string) => void;
  dialogs: [{ from: string; to: string; id: string; companion: User }];
}

const MessengerDialogs: React.FC<MessengerDialogProps> = ({ selectDialog, dialogs }) => {
  const [mappedDialogs, setMappedDialogs] = useState();

  return (
    <div className={styles.dialogsContainer}>
      {dialogs.map((el) => {
        console.log("EL", el);
        return (
          <DialogPreview
            id={el.companion.id}
            address={el.companion.firstName}
            date=""
            pic={el.companion.profilePic || userInitState.profilePic}
            lastMessage=""
          />
        );
      })}
    </div>
  );
};

export default MessengerDialogs;
