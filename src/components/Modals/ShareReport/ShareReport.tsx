import React from "react";
import { toast } from "react-toastify";
import cx from "classnames";
import Image from "next/image";

import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ShareReport.module.scss";

import Button from "@/components/Button/Button";

import modalImage from "@/assets/images/share-report-modal-image.svg?url";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hideModal } from "@/redux/Modal/ModalSlice";

function ShareReport({ show, size, modalName }) {
  const dispatch = useAppDispatch();
  const modalData = useAppSelector((state) => state.modal.modalData);

  const handleClose = () => {
    dispatch(hideModal({ name: "taskDeleteNotification" }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Report",
          text: "Report Details",
          url: window.location.href
        })
        .then(() => {
          handleClose();
        })
        .catch(() => toast.warn("An Error occured. Please try again"));
    } else {
      toast.warn("Web Share API not supported.");
    }
  };

  return (
    <ModalContainer show={show} size={size} modalName={modalName}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexCol")}>
          <h6 className={cx(styles.headerTitle)}>{modalData.title}</h6>
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          <Image className={cx(styles.modalImage)} src={modalImage} alt='modal-image' />
        </div>

        <div className={cx(styles.modalFooter)}>
          <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
            <Button onClick={handleClose} title='Cancel' btnType='secondary' />
            <Button onClick={handleShare} title='Open Email App' />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

export default ShareReport;
