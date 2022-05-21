import messengerApi from "@/api/messenger/messengerApi";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import sendImage from "@/assets/images/icons/send.svg";
import MessageComponent from "../message/MessageComponent";
import styles from "./styles.module.scss";

interface DialogProps {
  id: string;
  users: User[];
}

interface messageType {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: Date;
  hashed: string;
}

const Dialog: React.FC<DialogProps> = ({ id, users }) => {
  const user = useSelector<RootState, User>((app) => app.user);
  const ref = useRef<HTMLDivElement>();
  const [messages, setMessages] = useState<messageType[]>([]);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const SERVER_URL = "/";

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("message", async (d) => {
      console.log("NEW MESSAGE");
      if (d.data.from !== user.id && d.data.to !== user.id) return;
      const data = await messengerApi.getMessage(d.data.id);
      const newMessage = await data;
      if (!newMessage.error) {
        console.log(newMessage);
        setMessages((s) => [...s, newMessage]);
      }

      scroll();
    });
  }, []);

  const scroll = () => {
    console.log(ref);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    const scrolledY = window.scrollY;

    if (scrolledY) {
      window.scroll(0, scrolledY - 80);
    }
  };

  useEffect(() => {
    async function load() {
      const res = await messengerApi.getMessages({ from: user.id, to: id, limit: 100, offset: 0 });
      setMessages(res.data.reverse());
      setTimeout(() => {
        scroll();
      }, 200);
    }
    load();
  }, [id]);

  const handleSendMessage = async () => {
    const res = await messengerApi.createMessage({ from: user.id, to: id, text: message });
    console.log("result", res);
    setMessage("");
  };

  const listenEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e);
    if (e.key === "Enter" && e.ctrlKey) {
      console.log("kek");
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    console.log("    messages", messages);
  }, [messages]);

  return (
    <div>
      <div className={styles.contentWrapper}>
        <div className={styles.messagesWrapper}>
          {messages
            ?.filter((el) => el?.from === user.id || el?.to === user.id)
            .map((item) => {
              const us = users.find((u) => u.id === item.from);

              return <MessageComponent ref={ref} user={us} message={item} />;
            })}
        </div>
        <div className={styles.bottomElements}>
          <textarea
            value={message}
            onKeyDown={(e) => listenEnter(e)}
            onChange={(e) => setMessage(e.currentTarget.value)}
          />
          <button type="button" className={styles.imageContainer} onClick={handleSendMessage}>
            <img src={sendImage} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
