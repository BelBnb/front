import { DialogPreviewType } from "@/types/dialogs";
import React from "react";
import DialogPreview from "./dialogPreview/dialogPreview";
import styles from "./styles.module.scss";

interface MessengerDialogProps {
  selectDialog: (e: string) => void;
}

const MessengerDialogs: React.FC<MessengerDialogProps> = ({ selectDialog }) => {
  const dialogs: DialogPreviewType[] = [
    {
      address: "Kirill",
      date: "yesterday",
      lastMessage: "Ti mne deneg doljen",
      pic: "https://media.wired.co.uk/photos/607d91994d40fbb952b6ad64/4:3/w_2664,h_1998,c_limit/wired-meme-nft-brian.jpg",
    },
    {
      address: "Serafim",
      date: "today",
      lastMessage: "Ti mne deneg doljen",
      pic: "https://media.wired.co.uk/photos/607d91994d40fbb952b6ad64/4:3/w_2664,h_1998,c_limit/wired-meme-nft-brian.jpg",
    },
    {
      address: "Ilya",
      date: "tomorrow",
      lastMessage: "Passport zashkvarniy",
      pic: "https://media-exp1.licdn.com/dms/image/C5603AQF0kAqiJqb3LQ/profile-displayphoto-shrink_200_200/0/1545884181956?e=1655942400&v=beta&t=0KZapEmHR8GRRJXxfgiuJh9oP_icd_xOIBdl0iJnukY",
    },
  ];

  return (
    <div className={styles.dialogsContainer}>
      {dialogs.map((el) => (
        <DialogPreview address={el.address} date={el.date} pic={el.pic} lastMessage={el.lastMessage} />
      ))}
    </div>
  );
};

export default MessengerDialogs;
