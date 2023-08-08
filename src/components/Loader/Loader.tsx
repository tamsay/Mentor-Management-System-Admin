import React from "react";
import cx from "classnames";

import styles from "./Loader.module.scss";

interface ILoaderProps {
  small?: boolean;
  fullPage?: boolean;
}

const Loader = ({ small = false, fullPage = true }: ILoaderProps) => (
  <div className={cx(styles.loaderContainer, fullPage && styles.fullPage, "flexRow-fully-centered")}>
    <div className={cx(small ? styles.smallSpinner : styles.bigSpinner, styles.spinner)} />
  </div>
);

export default Loader;
