import DialogComponent from "@/elements/common/dialog/dialog";
import React from "react";
import CommentInputs from "../commentInputs/commentInputs";

interface FeedBackDialogProps {
  setOpen: (e: boolean) => void;
  isOpen: boolean;
  updateComment: () => Promise<void>;
  textValue: string;
  setTextValue: (e: string) => void;
  starsValue: number;
  setStarsValue: (e: number) => void;
}

const FeedBackDialog: React.FC<FeedBackDialogProps> = ({
  setOpen,
  isOpen,
  updateComment,
  textValue,
  setTextValue,
  starsValue,
  setStarsValue,
}) => (
  <DialogComponent
    cancelLabel="Back"
    setOpen={setOpen}
    submitLabel="Submit"
    title="Update your comment"
    submitHandler={async () => {
      await updateComment();
    }}
    isOpen={isOpen}
  >
    <CommentInputs
      textValue={textValue}
      setTextValue={setTextValue}
      starsValue={starsValue}
      setStarsValue={setStarsValue}
    />
  </DialogComponent>
);

export default FeedBackDialog;
