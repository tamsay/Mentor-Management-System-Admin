import React, { useEffect, useMemo,useState } from "react";
import { Outlet,useNavigate, useParams } from "react-router-dom";
import cx from "classnames";
import ReportListItem from "./ReportListItem/ReportListItem";
import styles from "./Reports.module.scss";
import SwitcherTab from "@/pages/Dashboard/Reports/SwitcherTab/SwitcherTab";

import Filter from "@/components/Filter/Filter";
import Search from "@/components/Search/Search";
import SelectionSideBar from "@/components/SelectionSideBar/SelectionSideBar";

import emptySelectionIcon from "@/assets/icons/empty-selection-icon.svg";
import subMenuIcon from "@/assets/icons/sub-menu-icon.svg";
import closeIcon from "@/assets/icons/undo-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllUserProfiles } from "@/redux/Profile/ProfileSlice";
import { getAllReports, getMonthlyReports, getWeeklyReports,getYearlyReports } from "@/redux/Reports/ReportsSlice";

import useIsMobile from "@/hooks/useIsMobile";

function Reports() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const isMobile = useIsMobile();
  const [selectedMenuId, setSelectedMenuId] = useState(params.id);
  const [reportDataArray, setReportDataArray] = useState([]);

  const allProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);

  // This allReportsData will be used when the endpoint is fixed and it returns the actual needed values
  // const allReportsData = useAppSelector((state) => state.reports.getAllReportsData);
  const allReportsData = useAppSelector((state) => state.reports.getYearlyReportsData); // This is a temporary fix
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
    setSelectedMenuId(params.id);
    dispatch(getAllUserProfiles());
  }, [navigate, dispatch, params.id]);

  useEffect(() => {
    if (activeTab === "programReport") {
      Array.isArray(allReportsData) && setReportDataArray(allReportsData.filter((item) => item.type === "program"));
    } else if (activeTab === "taskReport") {
      Array.isArray(allReportsData) && setReportDataArray(allReportsData.filter((item) => item.type === "task"));
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
          component: <ReportListItem key={index} data={item} userProfiles={allProfilesData} />,
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
            <Image
              onClick={() => setOpenSideBar(!openSideBar)}
              src={closeIcon}
              className={cx(styles.closeIcon)}
              alt='close-icon'
            />
          )}
        </div>
      </div>
    );

    return { listItems, headerComponent };
  };

  const handleSelectedItem = (item) => {
    setSelectedMenuId(() => {
      return item;
    });
    isMobile && handleCloseSideBar();

    // temporary fix for the report details
    let reportData = reportDataArray.find((report) => report.id === item);
    navigate(`report-details/${item}`, { state: { data: reportData } });
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
            <Image
              className={cx(styles.toggler)}
              src={subMenuIcon}
              alt='toggler'
              onClick={(e) => handleOpenSideBar(e, true, reportsCategoryArray[0].key)}
            />
            <small className={cx(styles.togglerText)}>MENU</small>
          </div>
          {/* <Button onClick={() => router.push("create-report")} title='Compose Report' /> */}
        </div>

        <div style={{ height: selectedMenuId ? "auto" : "100%" }} className={cx(styles.contentBody, "flexCol")}>
          {selectedMenuId ? (
            <Outlet />
          ) : (
            <div className={cx(styles.emptySelectionDiv, "flexCol-fully-centered")}>
              <Image src={emptySelectionIcon} alt='empty-selection-icon' />
              <p>No item selected yet </p>
              <p>Select an item from the list to view report details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
