import React from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import styles from "./MiniProfile.module.scss";

import { ReactComponent as MessageIcon } from "@/assets/icons/comment-icon.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/delete-icon-green.svg";
import profileImage from "@/assets/images/sample-profile-image.svg";

import { showModal } from "@/redux/Modal/ModalSlice";

const MiniProfile = ({ data, type, onClick }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDelete = (id) => {
    console.log(id, "user id");

    dispatch(
      showModal({
        name: "deleteNotification",
        modalData: {
          title: "Mentor Deleted Successfully",
          type: "user"
        }
      })
    );
  };

  return (
    <div className={cx(styles.miniProfileContainer, type === "grid" ? styles.gridView : styles.listView)}>
      <div className={cx(styles.imageDiv, "flexRow")}>
        <Image
          onClick={onClick}
          className={cx(styles.avatar)}
          src={data?.profileImage ? data?.profileImage : profileImage}
          alt='user-image'
        />
        <div className={cx(styles.btnGroup, "flexCol")}>
          <MessageIcon
            onClick={() => router.push(`/dashboard/messages/chats/${data?.id}`)}
            className={cx(styles.icon)}
          />
          <DeleteIcon onClick={() => handleDelete(data?.id)} className={cx(styles.icon)} />
        </div>
      </div>
      <div className={cx(styles.userInfo, "flexRow")}>
        <div onClick={onClick} className={cx(styles.leftSection)}>
          <div className={cx(styles.groupOne, "flexCol")}>
            <h5 className={cx(styles.name)}>{`${data?.firstName} ${data?.lastName}`}</h5>
            <p className={cx(styles.designation)}>{data?.headline || "Program Assistant, Andela"}</p>
          </div>

          <div className={cx(styles.positionTags, "flexRow")}>
            {data?.roles &&
              data?.roles.map((tag, index) => (
                <span key={index} className={cx(styles.tag)}>
                  {tag}
                </span>
              ))}
          </div>
        </div>

        <div className={cx(styles.btnGroup, "flexCol")}>
          <MessageIcon
            onClick={() => router.push(`/dashboard/messages/chats/${data?.id}`)}
            className={cx(styles.icon)}
          />
          <DeleteIcon onClick={() => handleDelete(data?.id)} className={cx(styles.icon)} />
        </div>
      </div>
    </div>
  );
};

MiniProfile.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default MiniProfile;
