"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";

import TaskListItem from "../TaskListItem/TaskListItem";
import styles from "./TasksLayout.module.scss";

import Button from "@/components/Button/Button";
import Filter from "@/components/Filter/Filter";
import GenericSideBar from "@/components/GenericSideBar/GenericSideBar";
import Search from "@/components/Search/Search";

import backIcon from "@/assets/icons/back-icon.svg?url";
import SubMenuIcon from "@/assets/icons/sub-menu-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllTasks, getCompletedTasks, getInprogressTasks } from "@/redux/Tasks/TasksSlice";

import { tasksListArray } from "@/constants/testData";

import useIsMobile from "@/hooks/useIsMobile";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [tasksArray, setTasksArray] = useState([]);

  // const allTasksData = useAppSelector((state) => state.tasks.getAllTasksData);
  const allTasksData = tasksListArray;
  const allCompletedTasksData = useAppSelector((state) => state.tasks.getCompletedTasksData);
  const allInprogressTasksData = useAppSelector((state) => state.tasks.getInprogressTasksData);
  const allTasksDataLoading = useAppSelector((state) => state.loading.getAllTasksLoading);
  const allCompletedTasksDataLoading = useAppSelector((state) => state.loading.getCompletedTasksLoading);
  const allInprogressTasksDataLoading = useAppSelector((state) => state.loading.getInprogressTasksLoading);

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  useEffect(() => {
    setTasksArray(allTasksData);
  }, [allTasksData]);

  useEffect(() => {
    isMobile ? setOpenSideBar(false) : setOpenSideBar(true);
  }, [isMobile]);

  const [collapseInput, setCollapseInput] = useState(true);
  const [closeSelectElement, setCloseSelectElement] = useState(false);

  const handleCloseSearchInput = () => {
    setCollapseInput(true);
  };

  const handleCloseSelectElement = () => {
    setCloseSelectElement(true);
  };

  const getSideBarData = () => {
    let listItems =
      Array.isArray(tasksArray) &&
      tasksArray.map((item, index) => {
        return {
          component: <TaskListItem key={index} data={item} />,
          id: item.id
        };
      });

    const headerComponent = (
      <div className={cx(styles.sideBarHeader, "flexRow-align-center")}>
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
          {collapseInput && <h3 className={cx(styles.title)}>Tasks</h3>}
        </div>
        <div className={cx(styles.searchWrapper)}>
          <Search
            inputPlaceholder='Search for tasks...'
            onChange={handleSearchInput}
            collapseInput={collapseInput}
            setCollapseInput={setCollapseInput}
            closeSelectElement={handleCloseSelectElement}
          />
        </div>
        <Filter
          dropdownItems={[
            { label: "All", value: "all" },
            { label: "Completed", value: "completed" },
            { label: "In-progress", value: "in-progress" }
          ]}
          selectedFilterItem={handleSelectedFilterItem}
          closeSearchInput={handleCloseSearchInput}
          closeSelectElement={closeSelectElement}
          setCloseSelectElement={setCloseSelectElement}
        />
      </div>
    );

    return { listItems, headerComponent };
  };

  const handleSearchInput = (data) => {
    console.log(data);
  };

  const handleSelectedFilterItem = (data) => {
    console.log(data);
    switch (data) {
      case "all":
        setTasksArray(allTasksData);
        break;
      case "completed":
        console.log(allCompletedTasksData);
        setTasksArray(allCompletedTasksData);
        break;
      case "in-progress":
        setTasksArray(allInprogressTasksData);
        break;
      default:
        break;
    }
  };

  const handleSelectedMenuItem = (id) => {
    router.push(`/dashboard/tasks/task-details/${id}`);
  };

  return (
    <div className={cx(styles.tasksContainer, "flexRow")}>
      {openSideBar && (
        <div className={cx(styles.sidebarWrapper)}>
          <GenericSideBar
            data={getSideBarData()}
            selectedMenuItem={handleSelectedMenuItem}
            closeGenericSideBar={() => setOpenSideBar(false)}
            loading={allTasksDataLoading || allCompletedTasksDataLoading || allInprogressTasksDataLoading}
          />
        </div>
      )}

      <section className={cx(styles.mainBody, "flexCol")}>
        <section className={cx(styles.heading, "flexRow-space-between")}>
          <div className={cx(styles.titleAndToggler, "flexRow")}>
            <div className={cx(styles.togglerDiv, "flexCol-fully-centered")}>
              <SubMenuIcon className={cx(styles.toggler)} alt='toggler' onClick={() => setOpenSideBar(!openSideBar)} />
              <small className={cx(styles.togglerText)}>MENU</small>
            </div>
            <h3 className={cx(styles.title)}>Tasks</h3>
          </div>
          <Button title='Create New Task' onClick={() => router.push("/dashboard/tasks/create-task")} />
        </section>

        <div className={cx(styles.content)}>{children}</div>
      </section>
    </div>
  );
};

export default Layout;
