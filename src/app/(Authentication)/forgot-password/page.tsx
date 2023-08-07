"use client";

import React, { useState } from "react";
import { Controller,useForm } from "react-hook-form";
import cx from "classnames";
import { useRouter } from "next/navigation";
import styles from "./ForgotPassword.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";

import AuthSideHero from "@/components/AuthSideHero/AuthSideHero";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

import { forgotPassword } from "@/redux/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { forgotPasswordSchema } from "@/helpers/validation";

function ForgotPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state?.loading?.forgotPasswordLoading);
  const [showOutcome, setShowOutcome] = useState(false);

  const handleForgotPassword = async (data) => {
    const response = await dispatch(forgotPassword(data));
    response?.success && setShowOutcome(true);
  };

  const resolver = yupResolver(forgotPasswordSchema);

  const defaultValues = {
    email: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues, resolver, mode: "all" });

  return (
    <div className={cx(styles.forgotPasswordContainer, "row")}>
      <div className={cx(styles.leftSection, "col-md-6", "col-sm-12")}>
        <AuthSideHero />
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-md-6", "col-sm-12")}>
        <div className={cx(styles.formContainer, "flexCol-fully-centered")}>
          <div className={cx(styles.formHeader, "flexCol")}>
            <h3 className={cx(styles.formTitle)}>Forgot Password?</h3>
            {!showOutcome ? (
              <p className={cx(styles.caption)}>To reset your password, enter the email address you use to sign in.</p>
            ) : (
              <div className={cx(styles.outcomeDiv, "flexCol")}>
                <p className={cx(styles.caption)}>
                  An email has been sent to your registered email.
                  <br /> Follow the link to reset your password.
                </p>

                <div className={cx(styles.btnDiv, "flexRow")}>
                  <Button onClick={() => router.push("/login")} title='Done' type='primary' />
                </div>
              </div>
            )}
          </div>
          {!showOutcome && (
            <div className={cx(styles.formWrapper, "flexCol")}>
              <form onSubmit={handleSubmit((data) => handleForgotPassword(data))}>
                <Controller
                  name='email'
                  control={control}
                  render={({ field }) => (
                    <InputField
                      {...field}
                      placeholder='Email'
                      type='email'
                      error={errors?.email && errors?.email?.message}
                    />
                  )}
                />

                <div className={cx(styles.submitBtnDiv, "flexRow")}>
                  <Button
                    onClick={handleSubmit((data) => handleForgotPassword(data))}
                    loading={loading}
                    disabled={loading}
                    title='Get Reset Link'
                    type='primary'
                  />
                </div>

                <div className={cx(styles.backToLoginWrapper, "flexRow")}>
                  <p onClick={() => router.push("/login")}>Back To Login</p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
