import React from "react";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./AuthSideHero.module.scss";

import logo from "@/assets/images/logo.svg";



function AuthSideHero() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div className={cx(styles.authSideHeroContainer, "flexCol-fully-centered")}>
      <Image onClick={handleClick} className={cx(styles.pageLogo)} src={logo} alt='logo' />
      <h6 onClick={handleClick} className={cx(styles.tagLine)}>
        Mentor Management System
      </h6>
    </div>
  );
}

export default AuthSideHero;
