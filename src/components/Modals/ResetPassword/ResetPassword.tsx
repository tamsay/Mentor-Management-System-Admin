import React from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./ResetPassword.module.scss";

import Button from "@/components/Button/Button";

import headerImage from "@/assets/images/reset-password-success.png";

import { hideModal } from "@/redux/Modal/ModalSlice";

function ResetPassword({ show, size, modalName }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(hideModal({ name: "resetPassword" }));
    router.push("/login");
  };

  return (
    <ModalContainer show={show} size={size} modalName={modalName}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexCol")}>
          <h6 className={cx(styles.headerTitle)}>Password reset successful</h6>
          <Image className={cx(styles.headerImage)} src={headerImage} alt='header-image' />
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          <div className={cx(styles.btnDiv, "flexRow-fully-centered")}>
            <Button onClick={handleClick} title='Done' />
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

ResetPassword.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string,
  modalName: PropTypes.string
};

export default ResetPassword;
