import React, { useState } from "react";
import cx from "classnames";
import styles from "./PendingCertificates.module.scss";

import Button from "@/components/Button/Button";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import { ReactComponent as TogglerIconDown } from "@/assets/icons/arrow-circle-down.svg";
import { ReactComponent as TogglerIconUp } from "@/assets/icons/arrow-circle-up.svg";
import { ReactComponent as CertificateIcon } from "@/assets/icons/certificate-thumbnail.svg";
import approvedSuccessImage from "@/assets/images/approved.svg";
import certificate from "@/assets/images/certificate-full.png";
import declinedSuccessImage from "@/assets/images/declined.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
const PendingCertificates = () => {
  const dispatch = useAppDispatch();

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  const [toggle, setToggle] = useState({
    index: null,
    toggle: false
  });

  const cardData = [
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      name: "Alison Davis",
      icon: CertificateIcon
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

  const handleApproval = (type) => {
    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: `Certificate ${type === "approve" ? "Approved" : "Declined"}`,
          image: type === "approve" ? approvedSuccessImage : declinedSuccessImage
        }
      })
    );
  };

  return (
    <div className={cx(styles.pendingCertificatesContainer, "flexCol")}>
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.cardContainer, "flexCol")}>
          {cardData.map((item, index) => {
            return (
              <div className={cx(styles.cardWrapper, "flexCol")} key={index}>
                <div className={cx(styles.cardHeader, "flexRow-space-between")}>
                  <div className={cx(styles.cardIcon)}>
                    <item.icon />
                  </div>
                  <div className={cx(styles.metaData, "flexCol")}>
                    <h6 className={cx(styles.name)}>{item?.name}</h6>
                    <p className={cx(styles.metaDataTitle)}>{item.title}</p>
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
                      <div className={cx(styles.certificateDiv, "flexRow-fully-centered")}>
                        <Image src={certificate} alt='certificate' />
                      </div>

                      <div className={cx(styles.btnGroup, "flexRow-align-center")}>
                        <Button onClick={() => handleApproval("decline")} title='Decline' btnType='secondary' />
                        <Button onClick={() => handleApproval("approve")} title='Approve' />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
};

export default PendingCertificates;
