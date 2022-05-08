import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import React from "react";

interface MyCommentProps {
  comment: FeedbackConstant;
  removeComment: () => void;
  setOpen: (e: boolean) => void;
}

const MyComment: React.FC<MyCommentProps> = ({ comment, removeComment, setOpen }) => (
  <div>
    kok{" "}
    <span>
      {comment.userFirstName} {comment.userLastName}
    </span>
    <span>{comment.text}</span>
    stars: {comment.stars}
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
);

export default MyComment;
