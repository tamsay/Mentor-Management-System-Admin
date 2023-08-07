import React from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";
import styles from "./EmptyHistory.module.scss";

import Button from "@/components/Button/Button";

import emptyHistoryIcon from "@/assets/icons/empty-message-history-icon.svg";

const EmptyHistory = () => {
  const router = useRouter();

  return (
    <div className={cx(styles.emptyHistoryDiv, "flexCol-fully-centered")}>
      <Image src={emptyHistoryIcon} alt='empty-message-history-icon' />
      <p>No Messages, Yet</p>
      <p>No messages in your chatbox, yet. Start chatting with other users</p>
      <Button title='Browse People' onClick={() => router.push("all-personels")} />
    </div>
  );
};

export default EmptyHistory;
