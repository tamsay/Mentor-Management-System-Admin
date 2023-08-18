"use client";

import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useProSidebar } from "react-pro-sidebar";
import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

import styles from "./DashboardHeader.module.scss";

import MessageIcon from "@/assets/icons/message-icon.svg";
import NotificationIcon from "@/assets/icons/notification-icon.svg";
import SearchIcon from "@/assets/icons/search-icon.svg";
import logo from "@/assets/images/logo.svg?url";

import { useAppSelector } from "@/redux/hooks";

import { initialsCase } from "@/helpers/textTransform";
function Header() {
  const [expanded, setExpanded] = useState(false);
  const { toggleSidebar } = useProSidebar();
  const router = useRouter();

  const userProfile = useAppSelector((state) => state.profile.getProfileData);

  const handleMenuClick = (e, path) => {
    e.preventDefault();
    router.push(path);
    setExpanded(false);
  };

  return (
    <section className={cx(styles.dashboardHeaderContainer, "flexRow-fully-centered")}>
      <Navbar expanded={expanded} expand='lg' className={cx(styles.navbarContainer, "flexRow")}>
        <div className={cx(styles.sideBarToggler)}>
          <Icon onClick={() => toggleSidebar()} icon='bi:layout-text-sidebar-reverse' color='#fff' width={24} />
        </div>

        <Navbar.Brand className={cx(styles.logoDiv, "flexRow")}>
          <Link href='/dashboard'>
            <Image className={cx(styles.logo)} src={logo} alt='logo' />
          </Link>
          <Link href='/dashboard'>
            <p className={cx(styles.caption)}>Mentor&apos;s Managers System</p>
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle
          onClick={() => setExpanded(expanded ? false : "expanded")}
          className={cx(styles.navbarToggler)}
          aria-controls='responsive-navbar-nav'
        />
        {/* <Navbar.Toggle className={cx(styles.navbarToggler)}>
          <div
            onClick={() => router.push("/dashboard/settings")}
            className={cx(styles.profileImageDiv, "flexRow-fully-centered")}
          >
            {userProfile?.profilePicture ? (
              <Image className={cx(styles.profileImage)} src={userProfile?.profilePicture} alt='profile-image' />
            ) : (
              <span className={cx(styles.profileImageText)}>{initialsCase(userProfile?.firstName)}</span>
            )}
          </div>
        </Navbar.Toggle> */}

        <Navbar.Collapse className={cx(styles.navbarCollapse, "flexRow")} id='responsive-navbar-nav'>
          <Nav className={cx(styles.primaryNavigation, "flexRow-space-between")}>
            <div className={cx(styles.inputDiv, "flexRow-align-center")}>
              <SearchIcon
                onClick={(e) => handleMenuClick(e, "/dashboard/search-results")}
                className={cx(styles.searchIcon)}
              />
              <input type='text' placeholder='Search for anything' />
            </div>
            <div className={cx(styles.iconsDiv, "flexRow-fully-centered")}>
              <div className={cx(styles.container, "flexRow-align-center")}>
                <span className={cx(styles.count)}>11</span>
                <MessageIcon onClick={(e) => handleMenuClick(e, "/dashboard/messages")} />
              </div>
              <div className={cx(styles.container, "flexRow-align-center")}>
                <span className={cx(styles.count)}>11</span>
                <NotificationIcon onClick={(e) => handleMenuClick(e, "/dashboard/notifications")} />
              </div>
            </div>
            <div
              onClick={(e) => handleMenuClick(e, "/dashboard/settings")}
              className={cx(styles.profileImageDiv, "flexRow-fully-centered")}
            >
              {userProfile?.profilePicture ? (
                <Image className={cx(styles.profileImage)} src={userProfile?.profilePicture} alt='profile-image' />
              ) : (
                <span className={cx(styles.profileImageText)}>{initialsCase(userProfile?.firstName)}</span>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
}

export default Header;
