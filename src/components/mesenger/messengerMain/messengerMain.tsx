import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessengerDialogs from "../dialogs/dialogs";
import Dialog from "../singleDialog/dialog";
import styles from "./styles.module.scss";
import messengerApi from "@/api/messenger/messengerApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";
import { PageSize } from "@/common/paginationConstants";
import userApi from "@/api/user/userApi";

const MessengerMain = () => {
  const user = useSelector<RootState, User>((el) => el.user);

  const [selectedDialog, setSelectedDialog] = useState("");

  const [dialogs, setDialogs] = useState([]);
  const [users, setUsers] = useState([]);

  const selectDialog = (e: string) => {
    setSelectedDialog(e);
  };

  useEffect(async () => {
    const d = await (await messengerApi.getDialogs(user.id, { limit: PageSize, offset: 0 })).json();

    const arr = [];

    d.data.forEach((item) => {
      arr.push(item.from);
      arr.push(item.to);
    });

    const s = Array.from(new Set(arr));
    console.log("d.data", s);

    const result = await userApi.getUsersByIds({
      ids: JSON.stringify(s),
    });
    const u = await result.json();
    u.push(user);
    setUsers(u);

    d.data = d.data.map((item) => {
      const userFrom = u.find((_user) => _user.id === item.from);
      const userTo = u.find((_user) => _user.id === item.to);
      if (userFrom.id === user.id) return { ...item, companion: userTo };
      return { ...item, companion: userFrom };
    });

    console.log(d.data);

    setDialogs(d.data);
  }, []);

  const params = useParams<{ id: string }>();
  useEffect(() => {}, [params]);

  return (
    <div className={styles.messengerWrapper}>
      <div className={styles.messengerContainer}>
        <div className={styles.dialogs}>
          <MessengerDialogs dialogs={dialogs} selectDialog={selectDialog} />
        </div>
        {params && params.id && (
          <div className={styles.selectedDialog}>
            <Dialog users={users} id={params.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessengerMain;
