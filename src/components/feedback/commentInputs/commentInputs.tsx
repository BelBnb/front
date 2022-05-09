import StarsComponent from "@/elements/common/Stars/StarsComponent";
import React from "react";
import styles from "./styles.module.scss";

interface CommentInputProps {
  textValue: string;
  setTextValue: (e: string) => void;
  starsValue: number;
  setStarsValue: (e: number) => void;
}

const CommentInputs: React.FC<CommentInputProps> = ({ textValue, setTextValue, setStarsValue, starsValue }) => (
  <div className={styles.content}>
    <textarea
      placeholder="Share your feedback with us"
      name="text"
      value={textValue}
      onChange={(event) => setTextValue(event?.target?.value || "")}
    />
    <StarsComponent isEdit onChange={setStarsValue} value={starsValue} />
  </div>
);

export default CommentInputs;
