import messengerApi from "@/api/messenger/messengerApi";
import ColoredButton from "@/elements/common/buttons/buttons";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import styles from "./styles.module.scss";
import userApi from "@/api/user/userApi";

interface DialogProps {
  id: string;
}

const Dialog: React.FC<DialogProps> = ({ id }) => {
  const user = useSelector<RootState, User>((app) => app.user);
  const [messages, setMessages] = useState();
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const SERVER_URL = "http://localhost:3005/";

  useEffect(() => {
    socketRef.current = io(SERVER_URL);

    socketRef.current.on("message", async (d) => {
      console.log("New message ", d);
      const data = await messengerApi.getMessage(d.data.id);
      const newMessage = await data.json();
      if (!newMessage.error) {
        console.log(newMessage);
        setMessages((s) => [...s, newMessage]);
      }
    });
  }, []);

  useEffect(() => {
    async function load() {
      const res = await (await messengerApi.getMessages({ from: user.id, to: id, limit: 100, offset: 0 })).json();
      setMessages(res.data);
    }
    load();
  }, []);

  const handleSendMessage = async () => {
    const res = await messengerApi.createMessage({ from: user.id, to: id, text: message });
    console.log("result", res);
    setMessage("");
  };

  return (
    <div>
      hi
      <div className={styles.prevMessages}>{JSON.stringify(messages)}</div>
      <input type="text" value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
      <ColoredButton coloredLabel="Send" onClick={handleSendMessage} />
    </div>
  );
};

export default Dialog;
