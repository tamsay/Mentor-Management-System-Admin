"use client";

import React, { useEffect, useMemo, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/navigation";

import ReportListItem from "../ReportListItem/ReportListItem";
import SwitcherTab from "../SwitcherTab/SwitcherTab";
import styles from "./ReportsLayout.module.scss";

import Filter from "@/components/Filter/Filter";
import Search from "@/components/Search/Search";
import SelectionSideBar from "@/components/SelectionSideBar/SelectionSideBar";

import SubMenuIcon from "@/assets/icons/sub-menu-icon.svg";
import CloseIcon from "@/assets/icons/undo-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllUserProfiles } from "@/redux/Profile/ProfileSlice";
import { getAllReports, getMonthlyReports, getWeeklyReports, getYearlyReports } from "@/redux/Reports/ReportsSlice";

import { reportsListArray } from "@/constants/testData";

import useIsMobile from "@/hooks/useIsMobile";

const Layout = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  const [reportDataArray, setReportDataArray] = useState([]);

  const allProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);

  // This allReportsData will be used when the endpoint is fixed and it returns the actual needed values
  // const allReportsData = useAppSelector((state) => state.reports.getAllReportsData);
  const allReportsData = reportsListArray;
  const allMonthlyReportsData = useAppSelector((state) => state.reports.getMonthlyReportsData); // This is a temporary fix
  const allYearlyReportsData = useAppSelector((state) => state.reports.getYearlyReportsData); // This is a temporary fix
  const allWeeklyReportsData = useAppSelector((state) => state.reports.getWeeklyReportsData); // This is a temporary fix

  const reportsCategoryArray = useMemo(
    () => [
      {
        id: 1,
        title: "Program Report",
        key: "programReport"
      },
      {
        id: 2,
        title: "Task Report",
        key: "taskReport"
      }
    ],
    []
  );

  const [activeTab, setActiveTab] = useState(reportsCategoryArray[0].key);

  useEffect(() => {
    dispatch(getAllReports());
    dispatch(getWeeklyReports());
    dispatch(getYearlyReports());
    dispatch(getMonthlyReports());
    dispatch(getAllUserProfiles());

    // You'll have to make 8 API calls here
    // dispatch(getAllProgramReports());
    // dispatch(getWeeklyProgramReports());
    // dispatch(getMonthlyProgramReports());
    // dispatch(getYearlyProgramReports());
    // dispatch(getAllTaskReports());
    // dispatch(getWeeklyTaskReports());
    // dispatch(getMonthlyTaskReports());
    // dispatch(getYearlyTaskReports());
  }, [dispatch]);

  useEffect(() => {
    // Everything here is a temp fix until backend endpoints are ready
    if (activeTab === "programReport") {
      Array.isArray(allReportsData) && setReportDataArray(allReportsData);
    } else if (activeTab === "taskReport") {
      Array.isArray(allReportsData) && setReportDataArray(allReportsData);
    }
  }, [activeTab, allReportsData]);

  const [openSideBar, setOpenSideBar] = useState({
    open: false,
    category: ""
  });

  useEffect(() => {
    isMobile
      ? setOpenSideBar({ open: false, category: "" })
      : setOpenSideBar({ open: true, category: reportsCategoryArray[0].key });
  }, [isMobile, reportsCategoryArray]);

  const handleOpenSideBar = (e, open, category) => {
    e.preventDefault();
    setOpenSideBar({
      ...openSideBar,
      open,
      category
    });
  };

  const handleSearchInput = (e) => {
    console.log(e.target.value);
  };

  const handleSelectedFilterItem = (data) => {
    switch (data) {
      case "year": {
        Array.isArray(allYearlyReportsData) &&
          setReportDataArray(
            allYearlyReportsData.filter((item) => item.type === (activeTab === "programReport" ? "program" : "task"))
          );
        break;
      }

      case "month": {
        Array.isArray(allMonthlyReportsData) &&
          setReportDataArray(
            allMonthlyReportsData.filter((item) => item.type === (activeTab === "programReport" ? "program" : "task"))
          );
        break;
      }

      case "week": {
        Array.isArray(allWeeklyReportsData) &&
          setReportDataArray(
            allWeeklyReportsData.filter((item) => item.type === (activeTab === "programReport" ? "program" : "task"))
          );
        break;
      }

      default: {
        Array.isArray(allReportsData) &&
          setReportDataArray(
            allReportsData.filter((item) => item.type === (activeTab === "programReport" ? "program" : "task"))
          );
        break;
      }
    }
  };

  const handleCloseSideBar = () => {
    setOpenSideBar({ open: false, category: "" });
  };

  const handleSelectedTab = (tab) => {
    setOpenSideBar({ open: true, category: tab.key });
    setActiveTab(tab.key);
  };

  const [collapseInput, setCollapseInput] = useState(false);
  const [closeSelectElement, setCloseSelectElement] = useState(false);

  const handleCloseSearchInput = (e) => {
    console.log(e, "handle close input");
    setCollapseInput(true);
  };

  const handleCloseSelectElement = (e) => {
    console.log(e, "handle close select");
    setCloseSelectElement(true);
  };
  const getListComponents = (data) => {
    const listItems =
      Array.isArray(data) &&
      data.map((item, index) => {
        return {
          component: <ReportListItem key={index} data={item} />,
          id: item.id
        };
      });

    const headerComponent = (
      <div className={cx(styles.sideBarHeader, "flexCol")}>
        <SwitcherTab data={reportsCategoryArray} selectedTab={handleSelectedTab} activeTab={activeTab} />

        <div className={cx(styles.searchAndFilterDiv, "flexRow")}>
          <div className={cx(styles.searchWrapper)}>
            <Search
              inputPlaceholder='Search for report...'
              onChange={handleSearchInput}
              collapseInput={collapseInput}
              setCollapseInput={setCollapseInput}
              closeSelectElement={handleCloseSelectElement}
            />
          </div>

          <Filter
            dropdownItems={[
              { label: "All Reports", value: "all" },
              { label: "Weekly Reports", value: "week" },
              { label: "Monthly Reports", value: "month" },
              { label: "Yearly Reports", value: "year" }
            ]}
            selectedFilterItem={handleSelectedFilterItem}
            closeSearchInput={handleCloseSearchInput}
            closeSelectElement={closeSelectElement}
            setCloseSelectElement={setCloseSelectElement}
          />

          {isMobile && (
            <CloseIcon onClick={() => setOpenSideBar(!openSideBar)} className={cx(styles.closeIcon)} alt='close-icon' />
          )}
        </div>
      </div>
    );

    return { listItems, headerComponent };
  };

  const handleSelectedItem = (item) => {
    isMobile && handleCloseSideBar();
    router.push(`/dashboard/reports/report-details/${item}`);
  };

  return (
    <div className={cx(styles.reportsContainer, "flexRow")}>
      {openSideBar.open && openSideBar.category === "taskReport" ? (
        <div className={cx(styles.sideBarSection)}>
          <SelectionSideBar
            selectedMenuItem={handleSelectedItem}
            data={getListComponents(reportDataArray)}
            activeClassName='active-report-item'
          />
        </div>
      ) : openSideBar.open && openSideBar.category === "programReport" ? (
        <div className={cx(styles.sideBarSection)}>
          <SelectionSideBar
            selectedMenuItem={handleSelectedItem}
            data={getListComponents(reportDataArray)}
            activeClassName='active-report-item'
          />
        </div>
      ) : null}

      <div className={cx(styles.content, "flexCol")}>
        <div className={cx(styles.heading, "flexRow")}>
          <div className={cx(styles.togglerDiv, "flexCol-fully-centered")}>
            <SubMenuIcon
              className={cx(styles.toggler)}
              alt='toggler'
              onClick={(e) => handleOpenSideBar(e, true, reportsCategoryArray[0].key)}
            />
            <small className={cx(styles.togglerText)}>MENU</small>
          </div>
          {/* <Button onClick={() => router.push("create-report")} title='Compose Report' /> */}
        </div>

        <div className={cx(styles.content)}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
