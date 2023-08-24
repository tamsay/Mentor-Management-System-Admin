"use client";

import React, { useEffect } from "react";
import cx from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import styles from "./ProgramDetails.module.scss";

import Button from "@/components/Button/Button";
import DeleteNotificationModal from "@/components/Modals/DeleteNotification/DeleteNotification";

import deleteArchiveIcon from "@/assets/icons/clear-list-reversed.svg";
import clockIcon from "@/assets/icons/clock-icon.svg";
import headerIcon from "@/assets/icons/google-filled-icon.svg";
import mentorsIcon from "@/assets/icons/mentor-icon-green.png";
import mentorManagersIcon from "@/assets/icons/mentor-manager-icon-green.png";
import reportIcon from "@/assets/icons/task-report-icon-green.png";
import calendarIcon from "@/assets/icons/tasks-overview-calendar-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
import { getProgramDetails } from "@/redux/Programs/ProgramsSlice";

import formatDate from "@/helpers/formatDate";

function ProgramDetails() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = usePathname();
  const programId = params.id;

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  const programDetails = useAppSelector((state) => state.programs.getProgramDetailsData);

  useEffect(() => {
    dispatch(getProgramDetails(programId));
  }, [dispatch, programId]);

  const programDetailsData = [
    {
      // icon: <ReportIcon />,
      icon: mentorManagersIcon,
      value: Array.isArray(programDetails?.mentorManagers) && programDetails?.mentorManagers.length,
      caption: "Mentor Managers assigned to this program"
    },
    {
      // icon: <ReportIcon />,
      icon: mentorsIcon,
      value: Array.isArray(programDetails?.mentors) && programDetails?.mentors.length,
      caption: "Mentors assigned to this program"
    },
    {
      // icon: <ReportIcon />,
      icon: reportIcon,
      value: Array.isArray(programDetails?.reports) && programDetails?.reports.length,
      caption: "Program / Reports",
      count: Array.isArray(programDetails?.reports) && programDetails?.reports.length
    }
  ];

  const handleDeleteTask = async () => {
    // this will be used when the endpoint is fixed
    // const response = await dispatch(deleteProgram(programId));
    // if (response.success) {
    //   dispatch(
    //     showModal({
    //       name: "programDeleteNotification",
    //       modalData: {
    //         title: "Program Deleted Successfully",
    //         type: "program"
    //       }
    //     })
    //   );
    //   router.push("/dashboard/programs");
    // }
    dispatch(
      showModal({
        name: "programDeleteNotification",
        modalData: {
          title: "Program Deleted Successfully",
          type: "program"
        }
      })
    );
  };

  return (
    <div className={cx(styles.programDetailsContainer, "flexCol")}>
      {programId && (
        <>
          <div className={cx(styles.header, "flexCol")}>
            <div className={cx(styles.wrapper, "flexRow-align-center")}>
              <Image
                className={cx(styles.icon, styles.programIcon)}
                src={programDetails?.programmePicture || headerIcon}
                alt='program-icon'
              />
              <div className={cx(styles.mainContent, "flexCol")}>
                <h5 className={cx(styles.title)}>{programDetails?.name}</h5>
                <div className={cx(styles.metaData, "flexRow")}>
                  <div className={cx(styles.info, "flexRow")}>
                    <Image className={cx(styles.icon)} src={calendarIcon} alt='calendar-icon' />
                    <span className={cx(styles.value)}>{formatDate(programDetails?.createdAt)}</span>
                  </div>
                  <div className={cx(styles.info, "flexRow")}>
                    <Image className={cx(styles.icon)} src={clockIcon} alt='clock-icon' />
                    <span className={cx(styles.value)}>
                      {new Date(programDetails?.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx(styles.body, "flexCol")}>
            <h6 className={cx(styles.subHeading)}>About:</h6>
            <p className={cx(styles.description)}>{programDetails?.description}</p>

            {programDetailsData.map((item, index) => {
              return (
                <div className={cx(styles.summaryDiv, "flexRow")} key={index}>
                  <div className={cx(styles.iconDiv, "flexRow")}>
                    <Image src={item.icon} alt='icon' />
                  </div>
                  <div className={cx(styles.summary, "flexRow")}>
                    <span className={cx(styles.summaryValue)}>{item.value}</span>
                    <span className={cx(styles.caption)}>{item.caption}</span>
                    <div>
                      <span className={cx(styles.count)}>{item.count}</span>
                    </div>
                  </div>

                  <Button onClick={() => console.log("hey")} title='View' size='small' />
                </div>
              );
            })}
          </div>

          <div className={cx(styles.btnGroup, "flexRow")}>
            <button onClick={() => handleDeleteTask()} className={cx(styles.deleteBtn, "flexRow-align-center")}>
              <Image src={deleteArchiveIcon} alt='delete-archive-icon' /> <span>Delete/Archive Program</span>
            </button>
            <Button title='Edit Program' onClick={() => router.push(`/dashboard/programs/edit-program/${programId}`)} />
          </div>
        </>
      )}

      <p>howdy</p>

      {displayModal && modalName === "programDeleteNotification" ? <DeleteNotificationModal show size='md' /> : null}
    </div>
  );
}

export default ProgramDetails;
