import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { User } from "@/types/redux/initStates";

const MessengerMain = ({ user, message }: { user: User; message: any }) => {
  const myUser = useSelector<RootState, User>((el) => el.user);
  console.log("User", user);
  return (
    <div>
      <img src={message.profilePic} alt={"Profile pic"} />
      {user.firstName}
      <span> {message.text}</span>
    </div>
  );
};

export default MessengerMain;
