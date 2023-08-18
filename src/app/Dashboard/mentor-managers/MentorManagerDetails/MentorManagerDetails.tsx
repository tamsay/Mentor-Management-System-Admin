import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import cx from "classnames";
import UserComponent from "../UserComponent/UserComponent";
import styles from "./MentorManagerDetails.module.scss";

import Button from "@/components/Button/Button";
import GenericSideBar from "@/components/GenericSideBar/GenericSideBar";
import EditUserRoleModal from "@/components/Modals/EditUserRole/EditUserRole";
import Search from "@/components/Search/Search";
import Tabs from "@/components/Tabs/Tabs";

import backIcon from "@/assets/icons/back-icon.svg";
import editIcon from "@/assets/icons/edit-icon.svg";
import flagIcon from "@/assets/icons/flag-icon.svg";
import subMenuIcon from "@/assets/icons/sub-menu-icon.svg";
import profileImage from "@/assets/images/sample-profile-image.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
import { getAllUserProfiles } from "@/redux/Profile/ProfileSlice";

import useIsMobile from "@/hooks/useIsMobile";

const MentorManagerDetails = () => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userId = useParams()?.id;

  const [openSideBar, setOpenSideBar] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [collapseInput, setCollapseInput] = useState(true);
  const [mentorManagersArray, setMentorManagersArray] = useState([]);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  const allUserProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);

  useEffect(() => {
    dispatch(getAllUserProfiles());
  }, [dispatch]);

  useEffect(() => {
    setMentorManagersArray(
      Array.isArray(allUserProfilesData) &&
        allUserProfilesData.filter((item) => item.roles.find((role) => role.toLowerCase() === "manager"))
    );
  }, [allUserProfilesData]);

  useEffect(() => {
    if (isMobile) {
      setOpenSideBar(false);
    } else {
      setOpenSideBar(true);
    }
  }, [isMobile]);

  useEffect(() => {
    setSelectedUser(Array.isArray(mentorManagersArray) && mentorManagersArray.find((item) => item.id === userId));
  }, [mentorManagersArray, userId]);

  const handleSelectedItem = (item) => {
    console.log(item);
  };

  const handleOpenSideBar = (e, open) => {
    e.preventDefault();
    setOpenSideBar(open);
  };

  const handleSearchInput = (e) => {
    console.log(e);
  };

  const handleCloseSelectElement = () => {
    // Added to clear console errors
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    router.push(`/dashboard/mentor-managers/mentor-manager-details/${user?.id}`);

    if (isMobile) {
      setOpenSideBar(false);
    }
  };

  const editUserRole = () => {
    console.log("edit user role");
    dispatch(
      showModal({
        name: "editUserRole",
        modalData: {
          title: "Edit User Role"
        }
      })
    );
  };

  const getListComponents = (data) => {
    const listItems =
      Array.isArray(data) &&
      data.map((item, index) => {
        return {
          component: <UserComponent onClick={handleViewUser} key={index} data={item} />,
          id: item.id
        };
      });

    const headerComponent = (
      <>
        <div className={cx(styles.sideBarHeader, "flexRow-space-between")}>
          <div
            style={{ display: !isMobile && !collapseInput ? "none" : "flex" }}
            className={cx(styles.titleDiv, "flexRow-align-center")}
          >
            {isMobile && (
              <Image
                onClick={() => setOpenSideBar(!openSideBar)}
                src={backIcon}
                className={cx(styles.backIcon)}
                alt='close-icon'
              />
            )}
            {collapseInput && <h3 className={cx(styles.title)}>Mentor Managers</h3>}
          </div>
          <div className={cx(styles.searchWrapper)}>
            <Search
              inputPlaceholder='Search for Mentor manager...'
              onChange={handleSearchInput}
              collapseInput={collapseInput}
              setCollapseInput={setCollapseInput}
              closeSelectElement={handleCloseSelectElement}
            />
          </div>
          {/* <Filter
            dropdownItems={[
              { label: "All", value: "all" },
              { label: "Mentors", value: "mentor" },
              { label: "Mentor Managers", value: "mentor-manager" }
            ]}
            selectedFilterItem={handleSelectedFilterItem}
            closeSearchInput={handleCloseSearchInput}
            closeSelectElement={closeSelectElement}
            setCloseSelectElement={setCloseSelectElement}
          /> */}
        </div>
      </>
    );

    return { listItems, headerComponent };
  };

  const getTabMenu = () => {
    let menuObject = {
      about: "About",
      programs: "Programs",
      mentors: "Mentors",
      tasks: "Tasks",
      certificates: "Certificates"
    };

    const tabMenu = Object.keys(menuObject).map((key) => {
      return {
        id: key,
        name: menuObject[key],
        path: key
      };
    });
    return tabMenu;
  };

  const handleTabMenuClick = (tab) => {
    router.push(tab.path);
  };

  return (
    <div className={cx(styles.mentorManagerDetailsContainer, "flexCol")}>
      {openSideBar ? (
        <div className={cx(styles.sideBarSection)}>
          <GenericSideBar selectedMenuItem={handleSelectedItem} data={getListComponents(mentorManagersArray)} />
        </div>
      ) : null}

      <div className={cx(styles.outletDiv, "flexCol")}>
        <div className={cx(styles.outletHeading, "flexRow")}>
          <div className={cx(styles.profile, "flexCol")}>
            <div className={cx(styles.bioSummary, "flexRow-align-center")}>
              <Image
                className={cx(styles.profileImage)}
                src={selectedUser?.profileImage || profileImage}
                alt='profile-image'
              />

              <div className={cx(styles.info, "flexRow")}>
                <div className={cx(styles.nameAndRole, "flexCol")}>
                  <p className={cx(styles.name)}>
                    {" "}
                    {selectedUser?.firstName && selectedUser?.firstName}{" "}
                    {selectedUser?.lastName && selectedUser?.lastName}
                  </p>
                  <p className={cx(styles.role)}>
                    {"Mentor Manager"} <Image onClick={() => editUserRole()} src={editIcon} alt='edit-icon' />{" "}
                  </p>
                </div>

                <Image className={cx(styles.flagIcon)} src={flagIcon} alt='flag' />
              </div>
            </div>
            <div className={cx(styles.btnGroup, "flexRow-align-center")}>
              <Button
                onClick={() => router.push("/dashboard/messages/chats/1")}
                title='Send Message'
                size={"small"}
                className={cx(styles.editBtn)}
              />
              <Button
                onClick={() => router.push("/dashboard/mentor-managers")}
                btnType='secondary'
                title='Close'
                size={"small"}
                className={cx(styles.viewBtn)}
              />
            </div>
          </div>
          {isMobile && (
            <div className={cx(styles.togglerDiv, "flexCol-fully-centered")}>
              <Image
                className={cx(styles.toggler)}
                src={subMenuIcon}
                alt='toggler'
                onClick={(e) => handleOpenSideBar(e, true)}
              />
              <small className={cx(styles.togglerText)}>All Users</small>
            </div>
          )}
        </div>

        <div className={cx(styles.outletBody, "flexCol")}>
          <div className={cx(styles.tabsWrapper, "flexCol")}>
            <Tabs data={getTabMenu()} onClick={handleTabMenuClick} />
          </div>

          <div className={cx(styles.contentWrapper)}>
            <Outlet />
          </div>
        </div>
      </div>
      {displayModal && modalName === "editUserRole" ? <EditUserRoleModal show size='md' /> : null}
    </div>
  );
};

export default MentorManagerDetails;
