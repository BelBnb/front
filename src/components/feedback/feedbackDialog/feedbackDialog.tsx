import DialogComponent from "@/elements/common/dialog/dialog";
import React from "react";

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
    title="Update comment"
    submitHandler={async () => {
      await updateComment();
    }}
    isOpen={isOpen}
  >
    <input
      placeholder="Text"
      type="text"
      name="text"
      value={textValue}
      onChange={(event) => setTextValue(event?.target?.value || "")}
    />
    <input
      placeholder="Stars"
      type="number"
      name="stars"
      min={1}
      max={5}
      value={starsValue}
      onChange={(event) => setStarsValue(Number(event?.target?.value) || 5)}
    />
  </DialogComponent>
);

export default FeedBackDialog;
