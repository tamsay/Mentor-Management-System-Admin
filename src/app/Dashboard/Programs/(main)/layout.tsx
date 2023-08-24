"use client";

import React, { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import ProgramListItem from "../ProgramListItem/ProgramListItem";
import styles from "./layout.module.scss";

import Button from "@/components/Button/Button";
import Filter from "@/components/Filter/Filter";
import GenericSideBar from "@/components/GenericSideBar/GenericSideBar";
import Search from "@/components/Search/Search";

import backIcon from "@/assets/icons/back-icon.svg?url";
import EmptySelectionIcon from "@/assets/icons/empty-selection-icon.svg";
import SubMenuIcon from "@/assets/icons/sub-menu-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getActivePrograms, getAllPrograms, getArchivedPrograms } from "@/redux/Programs/ProgramsSlice";

import { programsListArray } from "@/constants/testData";

import useIsMobile from "@/hooks/useIsMobile";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isMobile = useIsMobile();
  const [selectedMenuId, setSelectedMenuId] = useState(params.id);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [programsArray, setProgramsArray] = useState([]);

  // const allProgramsData = useAppSelector((state) => state.programs.getAllProgramsData);
  const allProgramsData = programsListArray;
  const allActiveProgramsData = useAppSelector((state) => state.programs.getActiveProgramsData);
  const allArchivedProgramsData = useAppSelector((state) => state.programs.getArchivedProgramsData);

  console.log(allArchivedProgramsData);

  useEffect(() => {
    dispatch(getAllPrograms());
    dispatch(getActivePrograms());
    dispatch(getArchivedPrograms());
  }, [dispatch]);

  useEffect(() => {
    setProgramsArray(allProgramsData);
  }, [allProgramsData]);

  useEffect(() => {
    isMobile ? setOpenSideBar(false) : setOpenSideBar(true);
  }, [isMobile]);

  const [collapseInput, setCollapseInput] = useState(true);
  const [closeSelectElement, setCloseSelectElement] = useState(false);

  const handleCloseSearchInput = (e) => {
    console.log(e, "handle close input");
    setCollapseInput(true);
  };

  const handleCloseSelectElement = (e) => {
    console.log(e, "handle close select");
    setCloseSelectElement(true);
  };

  const getMenuItems = () => {
    let listItems =
      Array.isArray(programsArray) &&
      programsArray.map((item, index) => {
        return {
          component: <ProgramListItem key={index} data={item} />,
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
          {collapseInput && <h3 className={cx(styles.title)}>Programs</h3>}
        </div>
        <div className={cx(styles.searchWrapper)}>
          <Search
            inputPlaceholder='Search for programs...'
            onChange={handleSearchInput}
            collapseInput={collapseInput}
            setCollapseInput={setCollapseInput}
            closeSelectElement={handleCloseSelectElement}
          />
        </div>
        <Filter
          dropdownItems={[
            { label: "All", value: "all" },
            { label: "Active", value: "active" },
            { label: "Archived", value: "archived" },
            { label: "Completed", value: "completed" }
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

  const handleSearchInput = (e) => {
    console.log(e.target.value);
  };

  const handleSelectedFilterItem = (data) => {
    console.log(data);
    switch (data) {
      case "all":
        setProgramsArray(allProgramsData);
        break;
      case "active":
        setProgramsArray(allActiveProgramsData);
        break;
      case "archived":
        setProgramsArray(allArchivedProgramsData);
        break;
      case "completed":
        setProgramsArray(allActiveProgramsData);
        break;
      default:
        break;
    }
  };

  // const handleCloseSidebar = () => {
  //   setOpenSideBar({ open: false, category: "" });
  // };

  const handleSelectedMenuItem = (id) => {
    setSelectedMenuId(id);
    router.push(`/dashboard/programs/program-details/${id}`);
  };

  return (
    <div className={cx(styles.programsContainer, "flexRow")}>
      {openSideBar && (
        <div className={cx(styles.sidebarWrapper)}>
          <GenericSideBar
            data={getMenuItems()}
            selectedMenuItem={handleSelectedMenuItem}
            closeGenericSideBar={() => setOpenSideBar(false)}
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
            <h3 className={cx(styles.title)}>Programs</h3>
          </div>
          <Button title='Create New Program' onClick={() => router.push("programs/create-program")} />
        </section>

        <div className={cx(styles.content)}>{children}</div>
      </section>
    </div>
  );
};

export default Layout;
