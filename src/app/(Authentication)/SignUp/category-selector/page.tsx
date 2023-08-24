"use client";

// assets
import React from "react";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./CategorySelector.module.scss";

import AuthSideHero from "@/components/AuthSideHero/AuthSideHero";

// components
import ArrowRight from "@/assets/icons/arrow-right-icon.svg";
import MentorIcon from "@/assets/icons/mentor-icon.svg";
import MentorManagerIcon from "@/assets/icons/mentor-manager-icon.svg";
const CategorySelector = () => {
  const router = useRouter();

  const selectorOptions = [
    {
      id: 1,
      title: "Mentor",
      description: "Oversee and guide learners from the start to finish",
      path: "/signup/mentor",
      icon: <MentorIcon alt='category-icon' />
    },
    {
      id: 2,
      title: "Mentor Manager",
      description: "Manage mentors and learners across all learning track",
      path: "/signup/mentor-manager",
      icon: <MentorManagerIcon alt='category-icon' />
    }
  ];

  return (
    <div className={cx(styles.signUpContainer, "row")}>
      <div className={cx(styles.leftSection, "col-md-6", "col-sm-12")}>
        <AuthSideHero />
      </div>
      <div className={cx(styles.rightSection, "flexCol", "col-md-6", "col-sm-12")}>
        <div className={cx(styles.header, "flexCol")}>
          <h3 className={cx(styles.headerTitle)}>Join the team!</h3>
          <p className={cx(styles.caption)}>Select the option that best suits your interest on MMS to continue.</p>
        </div>
        <div className={cx(styles.selectorDiv, "flexCol")}>
          {selectorOptions.map((option) => {
            return (
              <div
                onClick={() => router.push(`${option?.path}`)}
                key={option?.id}
                className={cx(styles.cardWrapper, "flexRow-align-center")}
              >
                <div className={cx(styles.iconDiv, "flexRow-fully-centered")}>{option?.icon}</div>
                <div className={cx(styles.content, "flexCol")}>
                  <h3 className={cx(styles.title)}>{option?.title}</h3>
                  <p className={cx(styles.description)}>{option?.description}</p>
                </div>
                <div className={cx(styles.arrowDiv)}>
                  <ArrowRight alt='arrow-right' className={cx(styles.icon)} />
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx(styles.signInDiv, "flexRow-fully-centered")}>
          <p className={cx(styles.caption)}>
            Already a User? <span onClick={() => router.push("/login")}>Signin</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
