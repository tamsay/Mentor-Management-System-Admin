import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import PropTypes from "prop-types";
import cx from "classnames";
import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ForgotPassword.module.scss";

import Button from "@/components/Button/Button";

import { hideModal } from "@/redux/Modal/ModalSlice";
// import { useRouter } from 'next/navigation'

function ForgotPassword({ show, size, modalName }) {
  const dispatch = useAppDispatch();
  // const router = useRouter()

  const modalData = useAppSelector((state) => state.modal.modalData);

  console.log(modalData, "modal data");

  const handleClick = () => {
    dispatch(hideModal({ name: "forgotPassword" }));
    // router.push("/login");
  };

  return (
    <ModalContainer show={show} size={size} modalName={modalName}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexCol")}>
          <h6 className={cx(styles.headerTitle)}>Forgot Password</h6>
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          <p className={cx(styles.content)}>
            An email has been sent to your registered email. Follow the link to reset your password.
          </p>
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

ForgotPassword.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string,
  modalName: PropTypes.string
};

export default ForgotPassword;
