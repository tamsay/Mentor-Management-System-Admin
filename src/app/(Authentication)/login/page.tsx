"use client";

import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./Login.module.scss";

import AuthSideHero from "@/components/AuthSideHero/AuthSideHero";
import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";

import googleIcon from "@/assets/icons/google-icon.svg";

import { login } from "@/redux/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/Profile/ProfileSlice";

import { loginSchema } from "@/helpers/validation";

// import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google";

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const loading = useAppSelector((state) => state?.loading?.loginLoading);

  // useEffect(() => {
  // }, []);

  const signIn = async (data) => {
    const response = await dispatch(login(data));
    if (response?.success) {
      dispatch(getProfile());
      router.push("/dashboard");
    }
  };

  const resolver = yupResolver(loginSchema);

  const defaultValues = {
    email: "",
    password: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <div className={cx(styles.loginContainer, "row")}>
      <div className={cx(styles.leftSection, "col-md-6", "col-sm-12")}>
        <AuthSideHero />
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-md-6", "col-sm-12")}>
        <div className={cx(styles.formContainer, "flexCol-fully-centered")}>
          <div className={cx(styles.formHeader, "flexCol")}>
            <h3 className={cx(styles.formTitle)}>Welcome</h3>
            <p className={cx(styles.caption)}>Login to continue</p>
          </div>

          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => signIn(data))}>
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
                  onClick={handleSubmit((data) => signIn(data))}
                  loading={loading}
                  disabled={loading}
                  title='Login'
                  btnType='primary'
                />
              </div>

              <div className={cx(styles.forgotPasswordWrapper, "flexRow")}>
                <p onClick={handleForgotPassword}>Forgot Password?</p>
              </div>
            </form>
          </div>
          <div className={cx(styles.googleLoginDiv, "flexRow-fully-centered")}>
            <Image src={googleIcon} alt='google-icon' />
            <span>Sign in with Google</span>
          </div>

          <div className={cx(styles.signUpDiv, "flexRow-fully-centered")}>
            <p className={cx(styles.caption)}>
              New User? <span onClick={() => router.push("/signup/category-selector")}>Signup</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
