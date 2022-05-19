import { RootState } from "@/redux/store";
import { User, userInitState } from "@/types/redux/initStates";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface MessageComponent {
  user: User;
  message: unknown;
}

const MessageComponent = React.forwardRef<HTMLDivElement, MessageComponent>(({ user, message }, ref) => {
  const myUser = useSelector<RootState, User>((el) => el.user);
  const messageDate = new Date(message?.timestamp).toLocaleDateString();
  const isMyMessage = message?.to !== myUser.id;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(!isMyMessage ? `/profile/${message.from}` : `/profile`);
  };
  return (
    <>
      {user && message && (
        <div
          onClick={() => handleClick()}
          ref={ref}
          className={`${styles.messageWrapper} ${!isMyMessage ? styles.left : styles.right}`}
        >
          <div className={styles.imageWrapper}>
            <img src={message?.companion?.profilePic || userInitState.profilePic} alt="Profile pic" />
          </div>
          <div className={styles.messageContent}>
            <span className={styles.topLine}>
              <span>{user.firstName}</span>
              <div className={styles.time}>
                {new Date().toLocaleDateString() !== messageDate && <span>{messageDate}</span>}
                <span>{new Date(message?.timestamp).toLocaleTimeString()}</span>
              </div>
            </span>
            <span> {message?.text}</span>
          </div>
        </div>
      )}
      <span />
    </>
  );
});

export default MessageComponent;
