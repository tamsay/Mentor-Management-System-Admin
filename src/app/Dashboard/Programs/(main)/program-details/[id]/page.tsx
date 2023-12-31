"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import styles from "./ProgramDetails.module.scss";

import Button from "@/components/Button/Button";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import ClockIcon from "@/assets/icons/clock-icon.svg";
import DeleteIcon from "@/assets/icons/delete-icon-red.svg";
import mentorsIcon from "@/assets/icons/mentor-icon-green.png";
import mentorManagersIcon from "@/assets/icons/mentor-manager-icon-green.png";
import reportIcon from "@/assets/icons/task-report-icon-green.png";
import CalendarIcon from "@/assets/icons/tasks-overview-calendar-icon.svg";
import successImage from "@/assets/images/task-delete-success.png";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
import { getProgramDetails } from "@/redux/Programs/ProgramsSlice";

import arrayToString from "@/helpers/arrayToString";
import formatDate from "@/helpers/formatDate";
import { initialsCase } from "@/helpers/textTransform";

// to be removed when the endpoint is fixed
import { programsListArray } from "@/constants/testData";

const ProgramDetails = ({ params }: { params: { id: string } }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const programId = params.id;

  const [toggleBody, setToggleBody] = useState({
    index: null,
    open: false
  });

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  // const programDetails = useAppSelector((state) => state.programs.getProgramDetailsData);
  const programDetails = programsListArray.find((item) => item.id === programId);
  console.log(programId, "programId");

  console.log(programDetails, "programDetails");

  useEffect(() => {
    dispatch(getProgramDetails(programId));
  }, [dispatch, programId]);

  const programDetailsData = [
    {
      icon: mentorManagersIcon,
      value: Array.isArray(programDetails?.mentorManagers) && programDetails?.mentorManagers.length,
      caption: "Mentor Managers assigned to this program",
      data:
        Array.isArray(programDetails.mentors) &&
        programDetails?.mentors.map((item) => `${item?.firstName} ${item?.lastName}`)
    },
    {
      icon: mentorsIcon,
      value: Array.isArray(programDetails?.mentors) && programDetails?.mentors.length,
      caption: "Mentors assigned to this program",
      data:
        Array.isArray(programDetails.mentors) &&
        programDetails?.mentors.map((item) => `${item?.firstName} ${item?.lastName}`)
    },
    {
      // icon: <ReportIcon />,
      icon: reportIcon,
      value: Array.isArray(programDetails?.reports) && programDetails?.reports.length,
      caption: "Program / Reports",
      count: Array.isArray(programDetails?.reports) && programDetails?.reports.length,
      data: Array.isArray(programDetails.reports) && programDetails?.reports.map((item) => item?.title)
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
    //         type: "program",
    //         redirectUrl: "/dashboard/programs",
    //         image: successImage
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
          type: "program",
          redirectUrl: "/dashboard/programs",
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
    <div className={cx(styles.programDetailsContainer, "flexCol")}>
      {programId && (
        <>
          <div className={cx(styles.header, "flexCol")}>
            <div className={cx(styles.wrapper, "flexRow-align-center")}>
              <div className={cx(styles.iconDiv, "flexRow-fully-centered")}>
                {programDetails?.image ? (
                  <img className={cx(styles.icon, styles.programIcon)} src={programDetails?.image} alt='program-icon' />
                ) : (
                  <span className={cx(styles.initials)}>{initialsCase(programDetails?.name)}</span>
                )}
              </div>
              <div className={cx(styles.mainContent, "flexCol")}>
                <h5 className={cx(styles.title)}>{programDetails?.name}</h5>
                <div className={cx(styles.metaData, "flexRow")}>
                  <div className={cx(styles.info, "flexRow")}>
                    <CalendarIcon className={cx(styles.icon)} alt='calendar-icon' />
                    <span className={cx(styles.value)}>{formatDate(programDetails?.createdAt)}</span>
                  </div>
                  <div className={cx(styles.info, "flexRow")}>
                    <ClockIcon className={cx(styles.icon)} alt='clock-icon' />
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
                <div className={cx(styles.summaryDiv, "flexCol")} key={index}>
                  <div className={cx(styles.heading, "flexRow")}>
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

                    <Button onClick={() => handleToggleBody(index)} title='View' size='small' />
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

          <div className={cx(styles.btnGroup, "flexRow")}>
            <button onClick={() => handleDeleteTask()} className={cx(styles.deleteBtn, "flexRow-align-center")}>
              <DeleteIcon alt='delete-icon' /> <span>Delete Program</span>
            </button>
            <Button title='Edit Program' onClick={() => router.push(`/dashboard/programs/edit-program/${programId}`)} />
          </div>
        </>
      )}

      {displayModal && modalName === "programDeleteNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
};

export default ProgramDetails;
