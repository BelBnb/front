import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import messengerApi from "@/api/messenger/messengerApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import userApi from "@/api/user/userApi";
import messengerPic from "@/assets/images/backgrounds/messenger.png";
import styles from "./styles.module.scss";
import Dialog from "../singleDialog/dialog";
import MessengerDialogs from "../dialogs/dialogs";

const MessengerMain = () => {
  const user = useSelector<RootState, User>((el) => el.user);

  const [selectedDialog, setSelectedDialog] = useState("");

  const [dialogs, setDialogs] = useState([]);
  const [users, setUsers] = useState([]);

  const selectDialog = (e: string) => {
    setSelectedDialog(e);
  };

  const params = useParams<{ id: string }>();
  useEffect(() => {
    async function load() {
      const d = await messengerApi.getDialogs(user.id, { limit: 100, offset: 0 });

      const arr = [];

      d.data.forEach((item) => {
        arr.push(item.from);
        arr.push(item.to);
      });

      const s = Array.from(new Set(arr));

      const result = await userApi.getUsersByIds({
        ids: JSON.stringify(s),
      });
      const u = result;
      u.push(user);
      setUsers(u);

      d.data = d.data.map((item) => {
        const userFrom = u.find((_user) => _user.id === item.from);
        const userTo = u.find((_user) => _user.id === item.to);
        if (userFrom.id === user.id) return { ...item, companion: userTo };
        return { ...item, companion: userFrom };
      });

      setDialogs(d.data);
    }

    load();
  }, [params]);

  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerContainer}>
        <div className={styles.dialogs}>
          {dialogs.length > 0 ? (
            <MessengerDialogs dialogs={dialogs} selectDialog={selectDialog} />
          ) : (
            <span className={styles.rColEmpty}>It is so lonely there</span>
          )}
        </div>
        {params && params.id ? (
          <div className={styles.selectedDialog}>
            <Dialog users={users} id={params.id} />
            <div className={styles.backgroundImage}>
              <img src={messengerPic} alt="background" />
            </div>
          </div>
        ) : (
          <div className={styles.errDec}>
            <span>This is a great opportunity to find someone</span>
            <ol>
              <li>
                Open <Link to="/hotels">hotels page</Link>
              </li>
              <li>Choose favourite hotel</li>
              <li>Then give us a sign that you want to find neighbours</li>
              <li>Find someone through the search or leave a profile</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerMain;
