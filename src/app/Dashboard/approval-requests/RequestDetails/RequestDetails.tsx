/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import cx from "classnames";

import styles from "./RequestDetails.module.scss";

import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import paperIcon from "@/assets/icons/paper-icon.svg";
import approvedSuccessImage from "@/assets/images/approved.svg";
import declinedSuccessImage from "@/assets/images/declined.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

import arrayToString from "@/helpers/arrayToString";

const RequestDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userType = location?.state?.data?.type;

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  // const [requestDetails, setRequestDetails] = useState(null);

  const requestDetails = {
    id: 1,

    bio: {
      title: "Bio",
      response:
        "I am a software engineer with 5 years of experience in the industry. I have worked with a variety of technologies and have a passion for learning new things. I am currently working on a project that will help people find mentors in their area."
    },

    misc: {
      technicalProficiency: {
        title: "Technical Proficiency",
        response: ["Javascript", "Django", "Android"]
      },

      previousPrograms: {
        title: "Previous Programs",
        response: ["GADS 2022", "Google I/O Extended 2021"]
      },

      previousRolesHeld: {
        title: "Previous Roles Held",
        response: [
          "Learner",
          "Mentor",
          "Program Assistant",
          "Program Assistant Lead",
          "Learner",
          "Mentor",
          "Program Assistant",
          "Program Assistant Lead"
        ]
      },

      availability: {
        title: "Availability To Join Another Program",
        response: "Unavailable"
      },

      programOfInterest: {
        title: "Program Of Interest",
        response: "Google Africa Scholarship Program"
      },

      beenAMentorBefore: {
        title: "Been A Mentor Before",
        response: "Yes"
      },

      yearsOfTechnicalExperience: {
        title: "Years Of Technical Experience",
        response: "5years"
      }
    },

    documents: {
      title: "Documents",
      files: ["resume.doc", "cover_letter.pdf", "birth certificate.doc"]
    }
  };

  // useEffect(() => {
  //   setRequestDetails(requestData);
  // }, [requestData]);

  const handleSendMessage = (id) => {
    console.log(id);
    // router.push(`/dashboard/messages/${id}`);
  };

  const handleApproval = (type) => {
    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: `${userType === "mentor" ? "Mentor" : "Mentor Manager"} ${
            type === "approve" ? "Approved" : "Declined"
          }`,
          image: type === "approve" ? approvedSuccessImage : declinedSuccessImage
        }
      })
    );
  };

  return (
    <div className={cx(styles.requestDetailsContainer, "flexCol")}>
      {!requestDetails ? (
        <Loader />
      ) : (
        <div className={cx(styles.cardBody, "flexCol")}>
          <div className={cx(styles.subSectionWrapper, "flexCol")}>
            <h3 className={cx(styles.title)}>
              {requestDetails?.bio?.title} {id}
            </h3>
            <p className={cx(styles.bio)}>{requestDetails?.bio?.response}</p>
          </div>

          <div className={cx(styles.miscInfoDiv, styles.subSectionWrapper, "flexCol")}>
            {requestDetails &&
              Object.keys(requestDetails?.misc).map((key) => (
                <div key={key} className={cx(styles.miscInfo, "flexRow-align-center")}>
                  <h6 className={cx(styles.title)}>{requestDetails?.misc[key].title}:</h6>
                  <p className={cx(styles.info)}>
                    {(Array.isArray(requestDetails?.misc[key]?.response) &&
                      arrayToString(requestDetails?.misc[key]?.response)) ||
                      requestDetails?.misc[key]?.response}
                  </p>
                </div>
              ))}
          </div>

          <div className={cx(styles.subSectionWrapper, "flexCol")}>
            <h3 className={cx(styles.title)}>{requestDetails?.documents?.title}</h3>
            <p className={cx(styles.info, "flexRow-align-center")}>
              {Array.isArray(requestDetails?.documents?.files) &&
                requestDetails?.documents?.files.map((item) => {
                  return (
                    <span key={item} className={cx(styles.listItem, "flexRow")}>
                      <Image src={paperIcon} alt='paper-icon' />
                      {item}
                    </span>
                  );
                })}
            </p>
          </div>

          <div className={cx(styles.btnDiv, "flexRow-space-between")}>
            <span className={cx(styles.sendMessage)} onClick={() => handleSendMessage(requestDetails?.id)}>
              Send Message
            </span>
            <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
              <Button onClick={() => handleApproval("decline")} title='Decline' btnType='secondary' />
              <Button onClick={() => handleApproval("approve")} title='Approve' />
            </div>
          </div>
        </div>
      )}
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
};

export default RequestDetails;
