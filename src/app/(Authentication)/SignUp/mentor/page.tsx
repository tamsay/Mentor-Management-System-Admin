"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./SignUp.module.scss";

// import { useGoogleSignUp } from "@react-oauth/google";
import AuthSideHero from "@/components/AuthSideHero/AuthSideHero";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import ArrowLeft from "@/assets/icons/arrow-left-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";

import { signUp } from "@/redux/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

import { signUpSchema } from "@/helpers/validation";

interface ISignUpData {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state?.loading?.signUpLoading);
  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  const handleSignUp = async (data: ISignUpData) => {
    const response = await dispatch(signUp(data));

    if (response?.success) {
      dispatch(
        showModal({
          name: "successNotification",
          modalData: {
            title: "Registration successful",
            redirectUrl: "/login",
            message: `A verification mail has been sent to your
          registered email, please click the link to
          confirm your account.`
          }
        })
      );
      reset();
    }
  };

  const resolver = yupResolver(signUpSchema);

  const defaultValues = {
    name: "",
    email: "",
    password: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ defaultValues, resolver, mode: "all" });

  return (
    <div className={cx(styles.signUpContainer, "row")}>
      <div className={cx(styles.leftSection, "col-md-6", "col-sm-12")}>
        <AuthSideHero />
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-md-6", "col-sm-12")}>
        <div className={cx(styles.formContainer, "flexCol-fully-centered")}>
          <div className={cx(styles.formHeader, "flexCol")}>
            <h3 className={cx(styles.formTitle)}>Join the team!</h3>
            <p className={cx(styles.caption)}>Fill the form below</p>
          </div>
          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => handleSignUp(data))}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <InputField {...field} placeholder='Name' type='text' error={errors?.name && errors?.name?.message} />
                )}
              />

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

              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button
                  onClick={handleSubmit((data) => handleSignUp(data))}
                  loading={loading}
                  disabled={loading}
                  title='Register'
                  btnType='primary'
                />
              </div>
            </form>
          </div>
          <div className={cx(styles.googleSignUpDiv, "flexRow-fully-centered")}>
            <GoogleIcon alt='google-icon' />
            <span>Signup with Google</span>
          </div>

          <div className={cx(styles.signInDiv, "flexCol-fully-centered")}>
            <p className={cx(styles.caption)}>
              Already a User? <span onClick={() => router.push("/login")}>Signin</span>
            </p>
            <p onClick={() => router.back()} className={cx(styles.caption)}>
              <ArrowLeft alt='arrow-left' className={cx(styles.icon)} />
              <span style={{ marginLeft: "8px" }}>Go Back</span>
            </p>
          </div>
        </div>
      </div>
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
}

export default SignUp;
