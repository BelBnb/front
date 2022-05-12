import messengerApi from "@/api/messenger/messengerApi";
import ColoredButton from "@/elements/common/buttons/buttons";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";

interface DialogProps {
  id: string;
}

const Dialog: React.FC<DialogProps> = ({ id }) => {
  const user = useSelector<RootState, User>((app) => app.user);
  const [result, setResult] = useState();
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function load() {
      const res = await (await messengerApi.getMessages({ from: user.id, to: id, limit: 100, offset: 0 })).json();
      setResult(res.data);
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
      <div className={styles.prevMessages}>{JSON.stringify(result)}</div>
      <input type="text" value={message} onChange={(e) => setMessage(e.currentTarget.value)} />
      <ColoredButton coloredLabel="Send" onClick={handleSendMessage} />
    </div>
  );
};

export default Dialog;
