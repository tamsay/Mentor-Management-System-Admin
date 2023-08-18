import React from "react";
import cx from "classnames";

import DashboardHeader from "../DashboardHeader/DashboardHeader";
import DashboardSideBar from "../DashboardSideBar/DashboardSideBar";
import styles from "./DashboardContainer.module.scss";

import DashboardChildren from "@/components/DashboardChildren/DashboardChildren";

const DashboardContainer: React.FC<{ children: React.ReactNode }> = (props) => {
  const { children } = props;

  return (
    <div className={cx(styles.dashboardContainer, "flexCol")}>
      <div className={cx(styles.header, "flexRow-align-center")}>
        <DashboardHeader />
      </div>
      <section className={cx(styles.body, "flexRow")}>
        <div className={cx(styles.sideBar, "flexCol")}>
          <DashboardSideBar />
        </div>
        <div className={cx(styles.children, "flexCol")}>
          <DashboardChildren> {children} </DashboardChildren>
        </div>
      </section>
    </div>
  );
};

export default DashboardContainer;
