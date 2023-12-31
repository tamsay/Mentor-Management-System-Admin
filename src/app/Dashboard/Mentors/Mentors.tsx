import React, { useEffect, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";

import styles from "./Mentors.module.scss";

import Button from "@/components/Button/Button";
import MiniProfile from "@/components/Cards/MiniProfile/MiniProfile";
import AddUserModal from "@/components/Modals/AddUser/AddUser";
import DeleteNotificationModal from "@/components/Modals/DeleteNotification/DeleteNotification";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";
import Pagination from "@/components/Pagination/Pagination";
import Search from "@/components/Search/Search";

import { ReactComponent as GridViewIcon } from "@/assets/icons/grid-view-icon.svg";
import { ReactComponent as ListViewIcon } from "@/assets/icons/list-view-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
import { getAllUserProfiles } from "@/redux/Profile/ProfileSlice";

function Mentors() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [view, setView] = useState("grid");
  const [collapseInput, setCollapseInput] = useState(true);
  const [mentorsArray, setMentorsArray] = useState([]);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  const allUserProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [mentorsPerPage] = useState(6);
  // const [mentors, setMentors] = useState(mentorsArray);
  // const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllUserProfiles());
  }, [dispatch]);

  useEffect(() => {
    setMentorsArray(
      Array.isArray(allUserProfilesData) &&
        allUserProfilesData.filter((item) => item.roles.find((role) => role.toLowerCase() === "mentor"))
    );
  }, [allUserProfilesData]);

  const handleAddMentor = () => {
    dispatch(
      showModal({
        name: "addUser",
        modalData: {
          title: "Add Mentor",
          category: "mentor"
        }
      })
    );
  };

  const handleSearchInput = (data) => {
    console.log(data);
  };

  const handleSearchClick = () => {
    console.log("search icon clicked");
  };

  return (
    <div className={cx(styles.mentorsContainer, "flexCol")}>
      <div className={cx(styles.heading, "flexRow")}>
        <div className={cx(styles.leftSection, "flexRow")}>
          <h3 className={cx(styles.title)}>Mentors</h3>
          <div className={cx(styles.viewToggler, "flexRow")}>
            <GridViewIcon
              onClick={() => setView("grid")}
              className={cx(styles.icon, view === "grid" ? styles.isActive : null)}
            />
            <ListViewIcon
              onClick={() => setView("list")}
              className={cx(styles.icon, view === "list" ? styles.isActive : null)}
            />
          </div>
        </div>
        <div className={cx(styles.btnGroup, "flexRow")}>
          <Button
            onClick={() => router.push("/dashboard/messages/broadcast-message")}
            title='Send Broadcast Message'
            btnType='secondary'
            size='small'
          />
          <Button onClick={() => handleAddMentor()} title='Add New Mentor' size='small' />
        </div>
        <div className={cx(styles.paginationAndSearchDiv, "flexRow")}>
          {collapseInput && (
            <div className={cx(styles.paginationWrapper)}>
              <Pagination />
            </div>
          )}
          <div className={cx(styles.searchWrapper)}>
            <Search
              onSearchClick={handleSearchClick}
              onChange={handleSearchInput}
              expanded={false}
              inputPlaceholder={"Search for Mentors..."}
              collapseInput={collapseInput}
              setCollapseInput={setCollapseInput}
            />
          </div>
        </div>
      </div>

      <div className={cx(styles.body, view === "grid" ? styles.gridView : styles.listView)}>
        {mentorsArray.length > 0 ? (
          mentorsArray.map((mentor, index) => (
            <MiniProfile
              onClick={() => router.push(`mentor-details/${mentor?.id}`)}
              key={index}
              data={mentor}
              type={view}
            />
          ))
        ) : (
          <span>No Mentors Found</span>
        )}
      </div>

      {displayModal && modalName === "deleteNotification" ? <DeleteNotificationModal show size='md' /> : null}
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
      {displayModal && modalName === "addUser" ? <AddUserModal show size='md' /> : null}
    </div>
  );
}

export default Mentors;
