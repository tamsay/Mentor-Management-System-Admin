import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import cx from "classnames";

import styles from "./ApprovalRequests.module.scss";
import CategoryListItem from "./CategoryListItem/CategoryListItem";
import RecentListItem from "./RecentListItem/RecentListItem";

import Button from "@/components/Button/Button";
import GenericSideBar from "@/components/GenericSideBar/GenericSideBar";
import AddUserModal from "@/components/Modals/AddUser/AddUser";
import Pagination from "@/components/Pagination/Pagination";

import mentorCardImage from "@/assets/icons/blog-post-icon.svg";
import backIcon from "@/assets/icons/close-icon.svg";
import closeIcon from "@/assets/icons/close-icon.svg";
import mentorIcon from "@/assets/icons/mentor-icon-circle.svg";
import mentorManagerIcon from "@/assets/icons/mentor-manager-icon-circle.svg";
import mentorManagerCardImage from "@/assets/icons/new-entries-icon.svg";
import programIcon from "@/assets/icons/program-icon-circle.svg";
import subMenuIcon from "@/assets/icons/sub-menu-icon.svg";
import programCardImage from "@/assets/icons/timeline-icon.svg";
import certificateImage from "@/assets/images/certificate-full.png";
import mentorManagerImage from "@/assets/images/mentor-manager-thumbnail.svg";
import programImage from "@/assets/images/program-avatar.svg";
import mentorImage from "@/assets/images/sample-profile-image.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

import useIsMobile from "@/hooks/useIsMobile";

function ApprovalRequests() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const currentSubPath = useLocation().pathname.split("/")[3];
  const [openSideBar, setOpenSideBar] = useState(false);
  const [outletTitle, setOutletTitle] = useState("Mentor Manager Requests");
  const [showAddUserButton, setShowAddUserButton] = useState(true);
  const [showPagination, setShowPagination] = useState(true);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  useEffect(() => {
    isMobile ? setOpenSideBar(false) : setOpenSideBar(true);
  }, [isMobile]);

  useEffect(() => {
    if (currentSubPath === "program-requests") {
      setOutletTitle("Program Requests");
      setShowAddUserButton(false);
      setShowCloseIcon(false);
    } else if (currentSubPath === "mentor-requests") {
      setOutletTitle("Mentor Requests");
      setShowAddUserButton(true);
      setShowCloseIcon(false);
    } else if (currentSubPath === "request-details") {
      setOutletTitle("Details");
      setShowAddUserButton(false);
      setShowCloseIcon(true);
      setShowPagination(false);
    } else {
      setOutletTitle("Mentor Manager Requests");
      setShowAddUserButton(true);
      setShowCloseIcon(false);
    }
  }, [currentSubPath]);

  const recentDataArray = [
    {
      id: 1,
      name: "Kabiru Ibrahim",
      description: "Program Assistant, Andela, She/her",
      icon: mentorManagerIcon,
      cardImage: mentorManagerImage,
      previewImage: certificateImage,
      type: "mentorManager"
    },
    {
      id: 2,
      name: "Alison Davis",
      description: "Program Assistant, Andela, She/her",
      icon: mentorIcon,
      cardImage: mentorImage,
      previewImage: certificateImage,
      type: "mentor"
    },
    {
      id: 3,
      name: "Kabiru Ibrahim",
      description: "Program Assistant, Andela, She/her",
      icon: mentorIcon,
      cardImage: mentorImage,
      previewImage: certificateImage,
      type: "mentor"
    },
    {
      id: 4,
      name: "Google Africa Developer Scholarship",
      icon: programIcon,
      cardImage: programImage,
      count: 290,
      type: "program"
    },
    {
      id: 5,
      name: "Google Africa Developer Scholarship",
      icon: programIcon,
      cardImage: programImage,
      count: 30,
      type: "program"
    }
  ];

  const handleCategoryClick = (item) => {
    setOutletTitle(item.title);
    setShowAddUserButton(true);
    router.push(item.path);
  };

  const handleRecentListClick = (item) => {
    if (item?.type === "program") return;

    setShowAddUserButton(false);
    setShowCloseIcon(true);
    setOutletTitle("Details");
    router.push(`/dashboard/approval-requests/request-details/${item.id}`, { state: { data: item } });
  };

  const getSideBarData = () => {
    let categoryData = [
      {
        id: 1,
        title: "Mentor Manager Requests",
        icon: mentorManagerCardImage,
        count: 290,
        selected: true,
        path: "/dashboard/approval-requests/mentor-manager-requests"
      },
      {
        id: 2,
        title: "Mentor Requests",
        icon: mentorCardImage,
        count: 300,
        selected: false,
        path: "/dashboard/approval-requests/mentor-requests"
      },
      {
        id: 3,
        title: "Program Requests",
        icon: programCardImage,
        count: 100,
        selected: false,
        path: "/dashboard/approval-requests/program-requests"
      }
    ];

    let listItems = [
      {
        component: (
          <div className={cx(styles.topSection, "flexCol")}>
            <h3 className={cx(styles.title)}>Category</h3>
            {categoryData.map((item, index) => {
              return <CategoryListItem onClick={handleCategoryClick} key={index} data={item} />;
            })}
          </div>
        ),
        id: 1
      },
      {
        component: (
          <div className={cx(styles.bottomSection, "flexCol")}>
            <h3 className={cx(styles.title)}>Recent</h3>
            <div className={cx(styles.listWrapper, "flexCol")}>
              {recentDataArray.map((item, index) => {
                return <RecentListItem key={index} data={item} onClick={handleRecentListClick} />;
              })}
            </div>
          </div>
        ),
        id: 2
      }
    ];

    const headerComponent = isMobile && (
      <div className={cx(styles.sideBarHeader, "flexRow-align-center")}>
        <div style={{ display: !isMobile ? "none" : "flex" }} className={cx(styles.titleDiv, "flexRow-space-between")}>
          {isMobile && <h3 className={cx(styles.title)}>ApprovalRequests</h3>}
          {isMobile && (
            <Image
              onClick={() => setOpenSideBar(!openSideBar)}
              src={backIcon}
              className={cx(styles.backIcon)}
              alt='close-icon'
            />
          )}
        </div>
      </div>
    );

    return { listItems, headerComponent };
  };

  const handleSelectedMenu = () => {
    // this is added to remove the warning of unused prop on the generic sidebar component
  };

  const handleAddUser = (data) => {
    let title = "";
    let category = "";

    if (data === "Mentor Manager Requests") {
      title = "Add Mentor Manager";
      category = "mentorManager";
    } else if (data === "Mentor Requests") {
      title = "Add Mentor";
      category = "mentor";
    }

    dispatch(
      showModal({
        name: "addUser",
        modalData: {
          title: title,
          category: category
        }
      })
    );
  };

  return (
    <div className={cx(styles.approvalRequestsContainer, "flexRow")}>
      {openSideBar && (
        <div className={cx(styles.sidebarWrapper)}>
          <GenericSideBar
            selectedMenuItem={handleSelectedMenu}
            data={getSideBarData()}
            closeGenericSideBar={() => setOpenSideBar(false)}
          />
        </div>
      )}

      <section className={cx(styles.mainBody, "flexCol")}>
        <section className={cx(styles.heading, "flexRow-space-between")}>
          <div className={cx(styles.titleAndToggler, "flexRow")}>
            <div className={cx(styles.togglerDiv, "flexCol-fully-centered")}>
              <Image
                className={cx(styles.toggler)}
                src={subMenuIcon}
                alt='toggler'
                onClick={() => setOpenSideBar(!openSideBar)}
              />
              <small className={cx(styles.togglerText)}>MENU</small>
            </div>
            <h3 className={cx(styles.title)}>{outletTitle}</h3>
          </div>
          {showAddUserButton && (
            <Button
              title={`Add New ${outletTitle ? outletTitle.replace(/requests/gi, "") : "User"}`}
              onClick={() => handleAddUser(outletTitle)}
            />
          )}

          {showPagination && (
            <div className={cx(styles.paginationAndSearchDiv, "flexRow")}>
              <div className={cx(styles.paginationWrapper)}>
                <Pagination />
              </div>
            </div>
          )}

          {showCloseIcon && (
            <Image src={closeIcon} alt='close-icon' onClick={() => router.push("/dashboard/approval-requests")} />
          )}
        </section>

        <div className={cx(styles.content)}>
          <Outlet />
        </div>
      </section>

      {displayModal && modalName === "addUser" ? <AddUserModal show size='md' /> : null}
    </div>
  );
}

export default ApprovalRequests;
