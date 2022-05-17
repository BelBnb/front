import messengerApi from "@/api/messenger/messengerApi";
import ColoredButton from "@/elements/common/buttons/buttons";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import MessageComponent from "../message/MessageComponent";
import styles from "./styles.module.scss";

interface DialogProps {
  id: string;
  users: User[];
}

const Dialog: React.FC<DialogProps> = ({ id, users }) => {
  const user = useSelector<RootState, User>((app) => app.user);
  const ref = useRef<HTMLDivElement>();
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const SERVER_URL = "/";

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("message", async (d) => {
      if (d.data.from !== user.id && d.data.to !== user.id) return;
      const data = await messengerApi.getMessage(d.data.id);
      const newMessage = await data.json();
      if (!newMessage.error) {
        console.log(newMessage);
        setMessages((s) => [...s, newMessage]);
      }

      scroll();
    });
  }, []);

  const scroll = () => {
    console.log(ref);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    const scrolledY = window.scrollY;

    if (scrolledY) {
      window.scroll(0, scrolledY - 80);
    }
  };

  useEffect(() => {
    async function load() {
      const res = await (await messengerApi.getMessages({ from: user.id, to: id, limit: 100, offset: 0 })).json();
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

  useEffect(() => {}, [messages]);

  return (
    <div>
      <div className={styles.contentWrapper}>
        <div className={styles.messagesWrapper}>
          {messages?.map((item, index) => {
            const us = users.find((u) => u.id === item.from);

            return <MessageComponent ref={ref} user={us} message={item} />;
          })}
        </div>
        <div className={styles.bottomElements}>
          <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
          <ColoredButton coloredLabel="Send" onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Dialog;
