import { FeedbackConstant } from "@/common/types/FeedbackConstant";
import React from "react";
import styles from "@/components/feedback/comment/styles.module.scss";
import StarsComponent from "@/elements/common/Stars/StarsComponent";
import { Link } from "react-router-dom";
import { request, requestWithBody } from "@/api/apiService";
import { deleteFeedback, updateBooking } from "@/api/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { RoleEnum } from "@/common/role.enum";
import { toast } from "react-toastify";

interface CommentProps {
  comment: FeedbackConstant;
}

const CommentComponent: React.FC<CommentProps> = ({ comment }) => {
  const user = useSelector<RootState, User>((el) => el.user);

  const removeComment = async () => {
    toast.promise(request(deleteFeedback(comment.id), "DELETE"), {
      pending: "Deleting...",
      success: "Deleted!",
      error: "Not deleted!",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.roundedImage}
          src={comment.userImage || "https://media2.giphy.com/media/7ZKpmNlwNnHWM/giphy.gif"}
          alt="prikol"
        />
      </div>
      <div className={styles.payload}>
        <div className={styles.header}>
          <Link to={`/profile/${comment.creator_Id}`} className={styles.name}>
            {comment.userFirstName} {comment.userLastName}
          </Link>
          <div className={styles.starsDiv}>
            <StarsComponent isEdit={false} onChange={() => {}} value={comment.stars} />
          </div>
        </div>
        <div className={styles.text}>{comment.text}</div>
      </div>
      {user.role === RoleEnum.Admin && (
        <div className={styles.delete}>
          <button type="button" onClick={removeComment}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
export default CommentComponent;
