"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./ResetPassword.module.scss";

import AuthSideHero from "@/components/AuthSideHero/AuthSideHero";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import successImage from "@/assets/images/default-success-notification-image.png";

import { resetPassword } from "@/redux/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

import { resetPasswordSchema } from "@/helpers/validation";

function ResetPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state?.loading?.resetPasswordLoading);
  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  const urlParams = useSearchParams();
  const token = urlParams.get("token");
  const email = urlParams.get("email");

  type ResetPasswordData = {
    password: string;
    confirmPassword: string;
  };

  const handleResetPassword = async (data: ResetPasswordData) => {
    const response = await dispatch(
      resetPassword({
        Password: data.password,
        ConfirmPassword: data.confirmPassword,
        token,
        email
      })
    );

    response?.success &&
      dispatch(
        showModal({
          name: "successNotification",
          modalData: {
            title: "Password reset successful",
            redirectUrl: "/login",
            image: successImage
          }
        })
      );
    reset();
  };

  const resolver = yupResolver(resetPasswordSchema);

  const defaultValues = {
    password: "",
    confirmPassword: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ defaultValues, resolver, mode: "all" });

  return (
    <div className={cx(styles.resetPasswordContainer, "row")}>
      <div className={cx(styles.leftSection, "col-md-6", "col-sm-12")}>
        <AuthSideHero />
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-md-6", "col-sm-12")}>
        <div className={cx(styles.formContainer, "flexCol-fully-centered")}>
          <div className={cx(styles.formHeader, "flexCol")}>
            <h3 className={cx(styles.formTitle)}>Set new password</h3>
          </div>

          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => handleResetPassword(data))}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <InputField
                    {...field}
                    placeholder='Password'
                    type='password'
                    error={errors?.password && errors?.password?.message}
                  />
                )}
              />

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

              <p className={cx(styles.caption)}>*Your new password must be different from previously used password.</p>

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button
                  onClick={handleSubmit((data) => handleResetPassword(data))}
                  loading={loading}
                  disabled={loading}
                  title='Reset Password'
                  btnType='primary'
                />
              </div>

              <div className={cx(styles.backToLoginWrapper, "flexRow")}>
                <p onClick={() => router.push("/login")}>Back To Login</p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
}

export default ResetPassword;
