import React, { useEffect,useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./Sent.module.scss";

import failedIcon from "@/assets/icons/close-icon.svg";
import pendingIcon from "@/assets/icons/close-icon.svg";
import deliveredIcon from "@/assets/icons/delivered.svg";
import readIcon from "@/assets/icons/delivered.svg";
import sentIcon from "@/assets/icons/sent.svg";

const Sent = ({ data }) => {
  const [statusIcon, setStatusIcon] = useState("");

  useEffect(() => {
    const statusObj = {
      sent: sentIcon,
      delivered: deliveredIcon,
      read: readIcon,
      failed: failedIcon,
      pending: pendingIcon
    };
    setStatusIcon(statusObj[data?.status]);
  }, [data?.status]);

  return (
    <div className={cx(styles.sentChatContainer, "flexRow")}>
      <div className={cx(styles.chatBody, "flexCol")}>
        <span className={cx(styles.chatMessage)}>{data?.message}</span>
        <div className={cx(styles.footer, "flexRow-space-between")}>
          <span className={cx(styles.chatTime)}>{data?.time}</span>
          <Image src={statusIcon} alt='status' />
        </div>
      </div>
    </div>
  );
};

Sent.propTypes = {
  data: PropTypes.object
};

export default Sent;
