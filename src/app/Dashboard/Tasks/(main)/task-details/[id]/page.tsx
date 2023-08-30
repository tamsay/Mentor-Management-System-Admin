"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import styles from "./TaskDetails.module.scss";

import Button from "@/components/Button/Button";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import DeleteIcon from "@/assets/icons/delete-icon-red.svg";
import mentorsIcon from "@/assets/icons/mentor-icon-green.png";
import mentorManagersIcon from "@/assets/icons/mentor-manager-icon-green.png";
import reportIcon from "@/assets/icons/task-report-icon-green.png";
import CalendarIcon from "@/assets/icons/tasks-overview-calendar-icon.svg";
import successImage from "@/assets/images/task-delete-success.png";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
import { deleteTask, getAllTasks, getTaskDetails } from "@/redux/Tasks/TasksSlice";

import arrayToString from "@/helpers/arrayToString";
import { capitalizeFirstWord, initialsCase } from "@/helpers/textTransform";

import { tasksListArray } from "@/constants/testData";

function TaskDetails({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const taskId = params.id;

  const [toggleBody, setToggleBody] = useState({
    index: null,
    open: false
  });

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  // const taskDetails = useAppSelector((state) => state.tasks.getTaskDetailsData);
  const taskDetails = tasksListArray.find((item) => item.id === taskId);
  const errorDetails = useAppSelector((state) => state.tasks.error);
  const deleteTaskLoading = useAppSelector((state) => state.loading.deleteTaskLoading);

  useEffect(() => {
    dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  const summaryDivData = [
    {
      icon: mentorManagersIcon,
      value: taskDetails?.mentorManagers?.length,
      caption: "Mentor Managers assigned to this task",
      data: Array.isArray(taskDetails.mentorManagers) && taskDetails?.mentorManagers.map((item) => item?.name)
    },
    {
      icon: mentorsIcon,
      value: taskDetails?.mentors?.length,
      caption: "Mentors assigned to this task",
      data: Array.isArray(taskDetails.mentors) && taskDetails?.mentors.map((item) => item?.name)
    },
    {
      icon: reportIcon,
      value: taskDetails?.reports?.length,
      caption: "Task / Reports",
      count: taskDetails?.reports?.length,
      data: Array.isArray(taskDetails.reports) && taskDetails?.reports.map((item) => item?.name)
    }
  ];

  const handleDeleteTask = async () => {
    let response = await dispatch(deleteTask(taskId));
    if (response.success) {
      dispatch(
        showModal({
          name: "taskDeleteNotification",
          modalData: {
            title: "Task Deleted Successfully",
            type: "task",
            redirectUrl: "/dashboard/tasks",
            image: successImage
          }
        })
      );
      dispatch(getAllTasks());
    }
    dispatch(
      showModal({
        name: "taskDeleteNotification",
        modalData: {
          title: "Task Deleted Successfully",
          type: "task",
          redirectUrl: "/dashboard/tasks",
          image: successImage
        }
      })
    );
  };

  const handleToggleBody = (index) => {
    if (toggleBody.index === index) {
      setToggleBody({
        index: null,
        open: false
      });
    } else {
      setToggleBody({
        index: index,
        open: true
      });
    }
  };

  return (
    <div className={cx(styles.taskDetailsContainer, "flexCol")}>
      {taskDetails?.id ? (
        <>
          <div className={cx(styles.header, "flexCol")}>
            <div className={cx(styles.wrapper, "flexRow-align-center")}>
              <div className={cx(styles.iconDiv, "flexRow-fully-centered")}>
                {taskDetails?.image ? (
                  <img className={cx(styles.icon, styles.taskIcon)} src={taskDetails?.image} alt='task-icon' />
                ) : (
                  <span className={cx(styles.initials)}>{initialsCase(taskDetails?.title)}</span>
                )}
              </div>

              <div className={cx(styles.mainContent, "flexCol")}>
                <h5 className={cx(styles.title)}>{taskDetails?.title}</h5>
                <div className={cx(styles.metaData, "flexRow")}>
                  <CalendarIcon className={cx(styles.dateIcon)} alt='calendar-icon' />
                  <span className={cx(styles.date)}>
                    {" "}
                    {taskDetails?.createdAt &&
                      capitalizeFirstWord(formatDistanceToNow(new Date(taskDetails?.createdAt), { addSuffix: true }))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={cx(styles.body, "flexCol")}>
            <p className={cx(styles.description)}>{taskDetails?.description}</p>

            {summaryDivData.map((item, index) => {
              return (
                <div className={cx(styles.summaryDiv, "flexCol")} key={index}>
                  <div className={cx(styles.heading, "flexRow")}>
                    <div className={cx(styles.iconDiv, "flexRow")}>
                      <Image src={item.icon} alt='icon' />
                    </div>
                    <div className={cx(styles.summary, "flexRow")}>
                      <span className={cx(styles.summaryValue)}>{item.value}</span>
                      <span className={cx(styles.caption)}>{item.caption}</span>
                      {item?.caption.toLowerCase().includes("report") && (
                        <div>
                          <span className={cx(styles.count)}>{item.count}</span>
                        </div>
                      )}
                    </div>

                    <Button title='View' size='small' onClick={() => handleToggleBody(index)} />
                  </div>
                  {toggleBody.open && toggleBody.index === index && (
                    <div className={cx(styles.body, "flexCol")}>
                      {Array.isArray(item.data) && item.data.length > 0 ? (
                        <div>{arrayToString(item?.data)}</div>
                      ) : (
                        <div>No Data Found</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className={cx(styles.btnGroup, "flexRow-align-center")}>
            {deleteTaskLoading ? (
              <span>Deleting...</span>
            ) : (
              <button
                disabled={deleteTaskLoading}
                onClick={() => handleDeleteTask()}
                className={cx(styles.deleteBtn, "flexRow-align-center")}
              >
                <DeleteIcon alt='delete-icon' /> <span>Delete Task</span>
              </button>
            )}
            <Button title='Edit Task' onClick={() => router.push(`/dashboard/tasks/edit-task/${taskId}`)} />
          </div>
        </>
      ) : (
        <div className={cx(styles.emptySelectionContainer, "flexCol-fully-centered")}>
          <p className={cx(styles.emptySelectionDescription)}>{errorDetails?.message}</p>
        </div>
      )}

      {displayModal && modalName === "taskDeleteNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
}

export default TaskDetails;
