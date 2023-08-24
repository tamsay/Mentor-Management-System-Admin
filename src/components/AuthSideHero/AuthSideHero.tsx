import React from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";

import styles from "./AuthSideHero.module.scss";

import Logo from "@/assets/images/logo.svg";

function AuthSideHero() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
  };

  return (
    <div className={cx(styles.authSideHeroContainer, "flexCol-fully-centered")}>
      <Logo onClick={handleClick} className={cx(styles.pageLogo)} alt='logo' />
      <h6 onClick={handleClick} className={cx(styles.tagLine)}>
        Mentor Management System
      </h6>
    </div>
  );
}

export default AuthSideHero;
