import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import React from "react";

interface CommentProps {
  comment: FeedbackConstant;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => (
  <div>
    <span>
      {comment.userFirstName} {comment.userLastName}
    </span>
    <span>{comment.text}</span>
    stars: {comment.stars}
  </div>
);

export default CommentComponent;
