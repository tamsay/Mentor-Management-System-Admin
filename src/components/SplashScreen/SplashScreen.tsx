"use client";

import React, { useEffect } from "react";
import cx from "classnames";
import styles from "./SplashScreen.module.scss";
import logo from "@/assets/images/logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }, []);

  return (
    <div className={cx(styles.splashScreenContainer, "flexCol-fully-centered")}>
      <Link href='/login'>
        <Image className={cx(styles.pageLogo)} src={logo} alt='logo' />
      </Link>
      <h6 className={cx(styles.tagLine)}>Mentor Management System</h6>
    </div>
  );
};

export default SplashScreen;
