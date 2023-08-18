"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
// import { useLocation, useNavigate } from "react-router-dom";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

import styles from "./DashboardSideBar.module.scss";

import ApprovalRequestsIcon from "@/assets/icons/approval-requests-icon.svg";
import CertificatesIcon from "@/assets/icons/certificates-icon.svg";
import DashboardIcon from "@/assets/icons/dashboard-icon.svg";
import DiscussionForumIcon from "@/assets/icons/discussion-forum-icon.svg";
import LogoutIcon from "@/assets/icons/logout-icon.svg";
import MentorManagersIcon from "@/assets/icons/mentor-managers-icon.svg";
import MentorsIcon from "@/assets/icons/mentors-icon.svg";
import MessagesIcon from "@/assets/icons/messages-icon.svg";
import ProfileIcon from "@/assets/icons/profile-icon.svg";
import ProgramsIcon from "@/assets/icons/programs-icon.svg";
import ReportsIcon from "@/assets/icons/reports-icon.svg";
import SettingsIcon from "@/assets/icons/settings-icon.svg";
import TasksIcon from "@/assets/icons/tasks-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/Profile/ProfileSlice";

import arrayToString from "@/helpers/arrayToString";
import { titleCase } from "@/helpers/textTransform";

import userInfo from "@/hooks/useGetUserInfo";
import useIsMobile from "@/hooks/useIsMobile";

import "./DashboardActiveMenu.scss";

function DashboardSideBar() {
  const location = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { toggleSidebar } = useProSidebar();
  const userData = userInfo();
  const currentPage = location.split("/")[2] || "";
  const userProfile = useAppSelector((state) => state.profile.getProfileData);

  const menuItemsArray = useMemo(
    () => [
      {
        name: "Profile",
        link: "profile",
        icon: ProfileIcon
      },
      {
        name: "Dashboard",
        link: "/home",
        icon: DashboardIcon
      },
      {
        name: "Programs",
        link: "programs",
        icon: ProgramsIcon
      },
      {
        name: "Tasks",
        link: "tasks",
        icon: TasksIcon
      },
      {
        name: "Reports",
        link: "reports",
        icon: ReportsIcon
      },
      {
        name: "Mentors",
        link: "mentors",
        icon: MentorsIcon
      },
      {
        name: "Mentor Managers",
        link: "mentor-managers",
        icon: MentorManagersIcon
      },
      {
        name: "Approval Requests",
        link: "approval-requests",
        icon: ApprovalRequestsIcon
      },
      {
        name: "Certificates",
        link: "certificates",
        icon: CertificatesIcon
      },
      {
        name: "Messages",
        link: "messages",
        icon: MessagesIcon,
        count: 11
      },
      {
        name: "Discussion Forum",
        link: "discussion-forum",
        icon: DiscussionForumIcon
      },
      {
        name: "Settings",
        link: "settings",
        icon: SettingsIcon
      },
      {
        name: "Logout",
        link: "/login",
        icon: LogoutIcon
      }
    ],
    []
  );

  useEffect(() => {
    isMobile && toggleSidebar(false);
  }, [isMobile, toggleSidebar]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    setActiveIndex(menuItemsArray.findIndex((item) => item.link === currentPage));
  }, [currentPage, menuItemsArray]);

  const [activeIndex, setActiveIndex] = useState(menuItemsArray.findIndex((item) => item.link === currentPage));

  const handleMenuClick = (index, menuItem) => {
    if (menuItem.toLowerCase() === "logout") {
      logout();
      router.push("/login");
    }

    setActiveIndex(index);
    toggleSidebar();
  };

  return (
    <div className={cx(styles.dashboardSideBarContainer, "flexCol")}>
      <Sidebar breakPoint='xl' className={cx(styles.sidebar)}>
        <div className={cx(styles.userInfoDiv, "flexCol")}>
          <h5 className={cx(styles.name)}>
            Hi,{" "}
            {titleCase(userProfile?.firstName) || titleCase(userProfile?.lastName || titleCase(userProfile?.fullName))}
          </h5>
          <p className={cx(styles.role)}>{arrayToString(userData?.roles)}</p>
        </div>
        <Menu>
          {menuItemsArray.map((item, index) => {
            return (
              <MenuItem
                key={index}
                className={cx(activeIndex === index && "sidebar-active-menu")}
                active={activeIndex === index}
                onClick={() => handleMenuClick(index, item.name)}
                icon={<item.icon />}
                prefix={item.count ? <span className={cx(styles.count)}>{item.count}</span> : null}
                component={<Link href={`/dashboard/${item?.link}`} />}
              >
                {" "}
                {item.name}
              </MenuItem>
            );
          })}
        </Menu>
      </Sidebar>
    </div>
  );
}

export default DashboardSideBar;
