"use client";

import React from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";

import styles from "./ProgramsOverview.module.scss";

import Button from "@/components/Button/Button";
import DashboardProgramsOverviewCard from "@/components/Cards/DashboardProgramsOverview/DashboardProgramsOverview";

import cardIcon from "@/assets/icons/programs-overview-card-icon.svg";

function ProgramsOverview() {
  const router = useRouter();

  const cardDataArray = [
    {
      title: "GADS Program 2023",
      value: "50%",
      date: "Jun 13, 2022 -> Feb 10, 2023",
      icon: cardIcon
    },
    {
      title: "GADS Program 2023",
      value: "60%",
      date: "Jun 13, 2022 -> Feb 10, 2023",
      icon: cardIcon
    },
    {
      title: "GADS Program 2022",
      value: "50%",
      date: "Jun 13, 2022 -> Feb 10, 2023",
      icon: cardIcon
    }
  ];

  return (
    <div className={cx(styles.programsOverviewContainer, "flexCol")}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h6 className={cx(styles.leftSection)}>Programs Overview</h6>

        <div className={cx(styles.rightSection)}>
          <p>6 active</p>
        </div>
      </div>

      <div className={cx(styles.cardsGroup)}>
        {cardDataArray.map((item, index) => (
          <DashboardProgramsOverviewCard key={index} data={item} />
        ))}
      </div>

      <div className={cx(styles.btnDiv, "flexRow")}>
        <Button onClick={() => router.push("programs")} title='View All' btnType='primary' size='small' />
      </div>
    </div>
  );
}

export default ProgramsOverview;
