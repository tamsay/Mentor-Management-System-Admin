import React, { useState } from "react";
import cx from "classnames";

import styles from "./MentorRequests.module.scss";

import Button from "@/components/Button/Button";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import { ReactComponent as TogglerIconDown } from "@/assets/icons/arrow-circle-down.svg";
import { ReactComponent as TogglerIconUp } from "@/assets/icons/arrow-circle-up.svg";
import emptySelectionIcon from "@/assets/icons/empty-selection-icon.svg";
import paperIcon from "@/assets/icons/paper-icon.svg";
import approvedSuccessImage from "@/assets/images/approved.svg";
import declinedSuccessImage from "@/assets/images/declined.svg";
import userImage from "@/assets/images/mentor-manager-thumbnail.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

import arrayToString from "@/helpers/arrayToString";
// import { useRouter } from 'next/navigation';

const MentorRequests = () => {
  const dispatch = useAppDispatch();
  // const router = useRouter()

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  const [toggle, setToggle] = useState({
    index: null,
    toggle: false
  });

  const cardData = [
    {
      id: 1,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    },
    {
      id: 2,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    },
    {
      id: 3,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    },
    {
      id: 4,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    },
    {
      id: 5,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    },
    {
      id: 6,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    },
    {
      id: 7,
      name: "Kabiru Omo Isaka",
      designation: "Program Assistant, Andela, He/Him",
      image: userImage,
      positionTags: ["PROGRAM ASST.", "MENTOR-GADS"]
    }
  ];

  const handleToggle = (index) => {
    if (toggle.index === index) {
      setToggle({
        index,
        toggle: !toggle.toggle
      });
    } else {
      setToggle({
        index,
        toggle: true
      });
    }
  };

  const handleSendMessage = (id) => {
    console.log(id);
    // router.push(`/dashboard/messages/${id}`);
  };

  const handleApproval = (type) => {
    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: `Mentor ${type === "approve" ? "Approved" : "Declined"}`,
          image: type === "approve" ? approvedSuccessImage : declinedSuccessImage
        }
      })
    );
  };

  const userData = {
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

  return (
    <div className={cx(styles.mentorRequestsContainer, "flexCol")}>
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.cardContainer, "flexCol")}>
          {Array.isArray(cardData) && cardData.length > 0 ? (
            cardData.map((item, index) => {
              return (
                <div className={cx(styles.cardWrapper, "flexCol")} key={index}>
                  <div className={cx(styles.cardHeader, "flexRow-space-between")}>
                    <div className={cx(styles.userInfoDiv)}>
                      <div className={cx(styles.imageDiv, "flexRow")}>
                        <Image className={cx(styles.avatar)} src={item?.image} alt='user-image' />
                      </div>
                      <div className={cx(styles.userInfo, "flexRow")}>
                        <div className={cx(styles.leftSection)}>
                          <div className={cx(styles.groupOne, "flexCol")}>
                            <h5 className={cx(styles.name)}>{item?.name}</h5>
                            <p className={cx(styles.designation)}>{item?.designation}</p>
                          </div>

                          <div className={cx(styles.positionTags, "flexRow")}>
                            {item?.positionTags &&
                              item?.positionTags.map((tag, index) => (
                                <span key={index} className={cx(styles.tag)}>
                                  {tag}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={cx(styles.cardToggler)}>
                      {toggle?.toggle && toggle.index === index ? (
                        <TogglerIconUp onClick={() => handleToggle(index)} />
                      ) : (
                        <TogglerIconDown onClick={() => handleToggle(index)} />
                      )}
                    </div>
                  </div>

                  {toggle.index === index && toggle.toggle && (
                    <>
                      <div className={cx(styles.cardBody, "flexCol")}>
                        <div className={cx(styles.subSectionWrapper, "flexCol")}>
                          <h3 className={cx(styles.title)}>{userData?.bio?.title}</h3>
                          <p className={cx(styles.bio)}>{userData?.bio?.response}</p>
                        </div>

                        <div className={cx(styles.miscInfoDiv, styles.subSectionWrapper, "flexCol")}>
                          {Object.keys(userData?.misc).map((key) => (
                            <div key={key} className={cx(styles.miscInfo, "flexRow-align-center")}>
                              <h6 className={cx(styles.title)}>{userData?.misc[key].title}:</h6>
                              <p className={cx(styles.info)}>
                                {(Array.isArray(userData?.misc[key]?.response) &&
                                  arrayToString(userData?.misc[key]?.response)) ||
                                  userData?.misc[key]?.response}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className={cx(styles.subSectionWrapper, "flexCol")}>
                          <h3 className={cx(styles.title)}>{userData?.documents?.title}</h3>
                          <p className={cx(styles.info, "flexRow-align-center")}>
                            {Array.isArray(userData?.documents?.files) &&
                              userData?.documents?.files.map((item) => {
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
                          <span className={cx(styles.sendMessage)} onClick={() => handleSendMessage(userData?.id)}>
                            Send Message
                          </span>
                          <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
                            <Button onClick={() => handleApproval("decline")} title='Decline' btnType='secondary' />
                            <Button onClick={() => handleApproval("approve")} title='Approve' />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <div className={cx(styles.emptySelectionDiv, "flexCol-fully-centered")}>
              <Image src={emptySelectionIcon} alt='empty-selection-icon' />
              <p>No Mentor Manager Selected</p>
            </div>
          )}
        </div>
      </div>
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
};

export default MentorRequests;
