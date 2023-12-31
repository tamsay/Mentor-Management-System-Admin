import React from "react";
import { useNavigate,useParams } from "react-router-dom";
import cx from "classnames";
import styles from "./ChatDetails.module.scss";
import Received from "./Received/Received";
import Sent from "./Sent/Sent";

import attachmentIcon from "@/assets/icons/attachment-icon.svg";
import closeIcon from "@/assets/icons/close-icon.svg";
import smileyIcon from "@/assets/icons/smiley-icon.svg";

import useIsMobile from "@/hooks/useIsMobile";

const ChatDetails = () => {
  const { id } = useParams();
  console.log(id, "chat id");
  const router = useRouter();
  const isMobile = useIsMobile();

  const chatData = [
    {
      id: 1,
      message: "Hello Kabiru, trust you are well?",
      time: "6:00pm",
      type: "received"
    },
    {
      id: 2,
      message: "Hi Alison, i am well. Thanks",
      time: "12:00pm",
      type: "sent",
      status: "read"
    },
    {
      id: 3,
      message: "Please are you in the meeting now, cos i'm on my way home",
      time: "12:00pm",
      type: "received"
    },
    {
      id: 4,
      message: "I'm not. Been waiting for you",
      time: "12:00pm",
      type: "sent",
      status: "delivered"
    },
    {
      id: 5,
      message: "Can we go ahead to join the UI/UX Team Meeting now",
      time: "12:00pm",
      type: "received"
    },
    {
      id: 6,
      message: "Hello Kabiru, trust you are well?",
      time: "6:00pm",
      type: "received"
    },
    {
      id: 7,
      message: "Hi Alison, i am well. Thanks",
      time: "12:00pm",
      type: "sent",
      status: "read"
    },
    {
      id: 8,
      message: "Please are you in the meeting now, cos i'm on my way home",
      time: "12:00pm",
      type: "received"
    },
    {
      id: 9,
      message: "I'm not. Been waiting for you",
      time: "12:00pm",
      type: "sent",
      status: "delivered"
    },
    {
      id: 10,
      message: "Can we go ahead to join the UI/UX Team Meeting now",
      time: "12:00pm",
      type: "received"
    }
  ];

  return (
    <div className={cx(styles.chatDetailsContainer, "flexCol")}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        {isMobile && <Image src={closeIcon} alt='close' onClick={() => router.push("/dashboard/messages/chats")} />}
      </div>

      <div className={cx(styles.chatsDiv, "flexCol")}>
        <div className={cx(styles.startTime, "flexRow")}>
          <span>Conversation started, 15 Oct</span>
          <hr />
        </div>

        <div className={cx(styles.chats, "flexCol")}>
          {chatData.map((chat) => {
            return chat.type === "sent" ? <Sent key={chat?.id} data={chat} /> : <Received key={chat?.id} data={chat} />;
          })}
        </div>
        <div className={cx(styles.footer, "flexRow-align-center")}>
          <div className={cx(styles.attachmentsDiv, "flexRow-align-center")}>
            <Image src={attachmentIcon} alt='attachment' />
            <Image src={smileyIcon} alt='smiley' />
          </div>
          <div className={cx(styles.inputDiv, "flexRow")}>
            <textarea rows='1' placeholder='Type a message...' d />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
