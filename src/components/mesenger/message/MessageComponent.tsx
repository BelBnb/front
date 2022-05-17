import { RootState } from "@/redux/store";
import { User, userInitState } from "@/types/redux/initStates";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

interface MessageComponent {
  user: User;
  message: unknown;
}

const MessageComponent = React.forwardRef<HTMLDivElement, MessageComponent>(({ user, message }, ref) => {
  const myUser = useSelector<RootState, User>((el) => el.user);
  return (
    <div ref={ref} className={`${styles.messageWrapper} ${message?.to === myUser.id ? styles.left : styles.right}`}>
      {user && message && (
        <>
          <div className={styles.imageWrapper}>
            <img src={message?.companion?.profilePic || userInitState.profilePic} alt="Profile pic" />
          </div>
          <div className={styles.messageContent}>
            <span className={styles.topLine}>
              <span>{user.firstName}</span>
              <div className={styles.time}>
                <span>{new Date(message?.timestamp).toLocaleDateString()}</span>
                <span>{new Date(message?.timestamp).toLocaleTimeString()}</span>
              </div>
            </span>
            <span> {message?.text}</span>
          </div>
        </>
      )}
    </div>
  );
});

export default MessageComponent;
