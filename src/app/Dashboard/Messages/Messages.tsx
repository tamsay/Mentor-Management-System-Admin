import React, { useEffect,useState } from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";
import EmptyHistory from "./EmptyHistory/EmptyHistory";
import styles from "./Messages.module.scss";

import Button from "@/components/Button/Button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllMessages } from "@/redux/Messages/MessagesSlice";

function Messages() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const getAllMessagesData = useAppSelector((state) => state?.messages?.getAllMessagesData);

  console.log(getAllMessagesData, "all messages");

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  return (
    <div className={cx(styles.messagesContainer, "flexCol")}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Chats</h3>
        <Button onClick={() => router.push("broadcast-message")} title='Send Broadcast Message' />
      </div>

      <div className={cx(styles.messagesOutlet, "flexCol")}>
        <EmptyHistory />
      </div>
    </div>
  );
}

export default Messages;
