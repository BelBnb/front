import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import StarsComponent from "@/elements/common/Stars/StarsComponent";
import React from "react";
import styles from "./styles.module.scss";

interface MyCommentProps {
  comment: FeedbackConstant;
  removeComment: () => void;
  setOpen: (e: boolean) => void;
}

const MyComment: React.FC<MyCommentProps> = ({ comment, removeComment, setOpen }) => (
  <div className={styles.flexDown}>
    <span className={styles.headerCaption}>Your last feedback</span>
    <span>{comment.text}</span>
    <StarsComponent isEdit={false} onChange={console.log} value={comment.stars} />
    <div className={styles.buttons}>
      <button
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        Update
      </button>
      <button type="button" className={styles.delete} onClick={removeComment}>
        Delete
      </button>
    </div>
  </div>
);

export default MyComment;
