import React from "react";
import styles from "@/components/feedback/notMyComment/styles.module.scss";
import CommentInputs from "../commentInputs/commentInputs";
import ColoredButton from "@/elements/common/buttons/buttons";

interface AddNewCommentProps {
  textValue: string;
  setTextValue: (e: string) => void;
  starsValue: number;
  setStarsValue: (e: number) => void;
  sendComment: () => void;
}

const AddNewComment: React.FC<AddNewCommentProps> = ({
  textValue,
  setTextValue,
  starsValue,
  setStarsValue,
  sendComment,
}) => (
  <div className={styles.createFeedback}>
    <CommentInputs
      textValue={textValue}
      setTextValue={setTextValue}
      starsValue={starsValue}
      setStarsValue={setStarsValue}
    />
    <div className={styles.createFeedbackButtonContainer}>
      <ColoredButton coloredLabel="Send" onClick={sendComment} />
    </div>
  </div>
);

export default AddNewComment;
