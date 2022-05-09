import React from "react";
import CommentInputs from "../commentInputs/commentInputs";

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
  <div>
    <CommentInputs
      textValue={textValue}
      setTextValue={setTextValue}
      starsValue={starsValue}
      setStarsValue={setStarsValue}
    />
    <button type="button" onClick={sendComment}>
      Send
    </button>
  </div>
);

export default AddNewComment;
