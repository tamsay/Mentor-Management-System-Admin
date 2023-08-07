import React from "react";
import { Controller,useForm } from "react-hook-form";
import cx from "classnames";
import styles from "./Password.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import ForgotPasswordModal from "@/components/Modals/ForgotPassword/ForgotPassword";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import successImage from "@/assets/images/default-success-notification-image.png";

import { forgotPassword } from "@/redux/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
import { changePassword } from "@/redux/Settings/SettingsSlice";

import { settingsPasswordSchema } from "@/helpers/validation";

import userInfo from "@/hooks/useGetUserInfo";

function Password() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state?.loading?.changePasswordLoading);
  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  const { email: userEmail } = userInfo();
  const resolver = yupResolver(settingsPasswordSchema);

  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleChangePassword = async (data) => {
    const response = await dispatch(changePassword(data));
    if (response?.success) {
      dispatch(
        showModal({
          name: "successNotification",
          modalData: {
            title: "Password changed successfully",
            image: successImage
          }
        })
      );
      reset();
    }
  };

  const handleForgotPassword = async () => {
    let response = await dispatch(forgotPassword({ email: userEmail }));
    response?.success && dispatch(showModal({ name: "forgotPassword", modalData: "" }));
  };

  return (
    <div className={cx(styles.passwordContainer, "flexCol")}>
      <form onSubmit={handleSubmit((data) => handleChangePassword(data))}>
        <div className={cx(styles.wrapper, styles.currentPasswordDiv)}>
          <div className={cx(styles.leftSection, styles.titleDiv)}>
            <h6 className={cx(styles.title)}>Current password</h6>
          </div>
          <div className={cx(styles.rightSection, styles.currentPasswordDetails)}>
            <Controller
              name='currentPassword'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Your current Password'
                  type='password'
                  error={errors?.currentPassword && errors?.currentPassword?.message}
                />
              )}
            />
          </div>
        </div>

        <div className={cx(styles.wrapper, styles.newPasswordDiv)}>
          <div className={cx(styles.leftSection, styles.titleDiv)}>
            <h6 className={cx(styles.title)}>New password</h6>
          </div>
          <div className={cx(styles.rightSection, styles.newPasswordDetails)}>
            <Controller
              name='newPassword'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Must be at least 8 characters'
                  type='password'
                  error={errors?.newPassword && errors?.newPassword?.message}
                />
              )}
            />
          </div>
        </div>

        <div className={cx(styles.wrapper, styles.confirmPasswordDiv)}>
          <div className={cx(styles.leftSection, styles.titleDiv)}>
            <h6 className={cx(styles.title)}>Confirm new password</h6>
          </div>
          <div className={cx(styles.rightSection, styles.confirmPasswordDetails)}>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Must match your new password'
                  type='password'
                  error={errors?.confirmPassword && errors?.confirmPassword?.message}
                />
              )}
            />
          </div>
        </div>

        <div className={cx(styles.btnDiv, "flexRow-right-centered")}>
          <Button
            loading={loading}
            disabled={loading}
            onClick={() => handleSubmit((data) => handleChangePassword(data))}
            title='Save new password'
          />
        </div>
      </form>
      <div className={cx(styles.forgotPasswordWrapper, "flexRow")}>
        <p onClick={() => handleForgotPassword()}>Forgot Password?</p>
      </div>

      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}

      {displayModal && modalName === "forgotPassword" ? <ForgotPasswordModal show size='md' /> : null}
    </div>
  );
}

export default Password;
