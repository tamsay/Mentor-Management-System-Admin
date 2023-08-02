import React from "react";
import { useRouter } from "next/navigation";
import cx from "classnames";
import styles from "./AuthSideHero.module.scss";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";

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
