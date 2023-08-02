import React, { useState, useEffect } from "react";
import cx from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import styles from "./Programs.module.scss";
import GenericSideBar from "@/components/GenericSideBar/GenericSideBar";
import backIcon from "@/assets/icons/back-icon.svg";
import Search from "@/components/Search/Search";
import Filter from "@/components/Filter/Filter";
import Button from "@/components/Button/Button";
import subMenuIcon from "@/assets/icons/sub-menu-icon.svg";
import emptySelectionIcon from "@/assets/icons/empty-selection-icon.svg";
import ProgramListItem from "./ProgramListItem/ProgramListItem";
import useIsMobile from "@/hooks/useIsMobile";
import { getAllPrograms, getActivePrograms, getArchivedPrograms } from "@/redux/Programs/ProgramsSlice";

function Programs() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isMobile = useIsMobile();
  const [selectedMenuId, setSelectedMenuId] = useState(params.id);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [programsArray, setProgramsArray] = useState([]);

  const allProgramsData = useAppSelector((state) => state.programs.getAllProgramsData);
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
    navigate(`program-details/${id}`);
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
              <Image
                className={cx(styles.toggler)}
                src={subMenuIcon}
                alt='toggler'
                onClick={() => setOpenSideBar(!openSideBar)}
              />
              <small className={cx(styles.togglerText)}>MENU</small>
            </div>
            <h3 className={cx(styles.title)}>Programs</h3>
          </div>
          <Button title='Create New Program' onClick={() => router.push("create-program")} />
        </section>

        <div className={cx(styles.content)}>
          {selectedMenuId ? (
            <Outlet />
          ) : (
            <div className={cx(styles.emptySelectionDiv, "flexCol-fully-centered")}>
              <Image src={emptySelectionIcon} alt='empty-selection-icon' />
              <p>No item selected yet </p>
              <p>Select an item from the list to view program details</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Programs;
