import React from "react";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./SuccessNotification.module.scss";

import Button from "@/components/Button/Button";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hideModal } from "@/redux/Modal/ModalSlice";

function SuccessNotification({ show, size, modalName }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalData = useAppSelector((state) => state.modal.modalData);

  const handleClick = () => {
    dispatch(hideModal({ name: "successNotification" }));
    modalData?.redirectUrl && router.push(modalData?.redirectUrl);
  };

  return (
    <ModalContainer show={show} size={size} modalName={modalName}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexCol")}>
          <h6 className={cx(styles.headerTitle)}>{modalData?.title || modalData}</h6>
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          {modalData?.image && (
            <Image className={cx(styles.successImage)} src={modalData?.image} alt='notification-image' />
          )}
          {modalData?.message && <p className={cx(styles.message)}>{modalData?.message}</p>}
        </div>

        <div className={cx(styles.modalFooter)}>
          <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
            <Button onClick={handleClick} title='Done' />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

SuccessNotification.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string,
  modalName: PropTypes.string
};

export default SuccessNotification;
