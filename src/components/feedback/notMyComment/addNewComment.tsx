import React from "react";

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
    <label>
      Text:
      <input value={textValue} type="text" name="text" onChange={(event) => setTextValue(event?.target?.value || "")} />
    </label>
    <label>
      Stars:
      <input
        value={starsValue}
        type="number"
        name="stars"
        min={1}
        max={5}
        onChange={(event) => setStarsValue(Number(event?.target?.value) || 5)}
      />
    </label>
    <button type="button" onClick={sendComment}>
      Send
    </button>
  </div>
);

export default AddNewComment;
