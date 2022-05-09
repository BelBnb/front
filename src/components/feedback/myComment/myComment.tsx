import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import React from "react";
import ReactStarsRating from "react-awesome-stars-rating";
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
    <div className={styles.prikol}>
      <ReactStarsRating isEdit={false} onChange={console.log} value={comment.stars} />
    </div>
    <div className={styles.buttons}>
      <button type="button" onClick={removeComment}>
        Delete
      </button>
      <button
        onClick={() => {
          setOpen(true);
        }}
        type="button"
      >
        Update
      </button>
    </div>
  </div>
);

export default MyComment;
