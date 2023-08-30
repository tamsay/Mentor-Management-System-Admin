import React from "react";
import cx from "classnames";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";

import styles from "./TaskListItem.module.scss";

import calendarIcon from "@/assets/icons/tasks-overview-calendar-icon.svg?url";

import { capitalizeFirstWord, initialsCase } from "@/helpers/textTransform";

type TaskListItemProps = {
  data: {
    id: string;
    image: string;
    title: string;
    createdAt: string;
  };
};

const TaskListItem: React.FC<TaskListItemProps> = ({ data }) => {
  const { id } = useParams();

  return (
    <div className={cx(styles.taskListItemContainer, "flexCol", id === data.id && styles.activeItem)}>
      <div className={cx(styles.body, "flexRow-align-center")}>
        {data?.image ? (
          <Image className={cx(styles.icon)} src={data?.image} alt='icon' width={100} height={100} />
        ) : (
          <span className={cx(styles.avatarText, "flexRow-fully-centered")}>{initialsCase(`${data?.title}`)}</span>
        )}
        <div className={cx(styles.mainContent, "flexCol")}>
          <h5 className={cx(styles.title)}>{data?.title}</h5>
          <div className={cx(styles.metaData, "flexRow")}>
            <Image className={cx(styles.dateIcon)} src={calendarIcon} alt='calendar-icon' />
            <span className={cx(styles.date)}>
              {data?.createdAt &&
                capitalizeFirstWord(formatDistanceToNow(new Date(data?.createdAt), { addSuffix: true }))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListItem;
