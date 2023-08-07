import React, { useEffect, useRef,useState } from "react";
import { useLocation,useNavigate, useParams } from "react-router-dom";
import cx from "classnames";
import html2pdf from "html2pdf.js";
import styles from "./ReportDetails.module.scss";

import Button from "@/components/Button/Button";
import ShareReportModal from "@/components/Modals/ShareReport/ShareReport";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import closeIcon from "@/assets/icons/close-icon.svg";
import reportIcon from "@/assets/icons/reports-overview-card-icon.svg";
import successImage from "@/assets/images/default-success-notification-image.png";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

// import { getReportDetails } from "@/redux/Reports/ReportsSlice";
import formatDate from "@/helpers/formatDate";


const ReportDetails = () => {
  const dispatch = useAppDispatch();
  const contentRef = useRef();
  const btnGroupRef = useRef();
  const params = useParams();
  const reportId = params.id;
  const router = useRouter();

  const [userFullName, setUserFullName] = useState("");

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  const userProfiles = useAppSelector((state) => state.profile.getAllUserProfilesData);
  // const reportDetails = useAppSelector((state) => state.reports.getReportDetailsData);

  // Temporary fix for report details. It will be removed when the endpoint is fixed
  const location = useLocation();
  const reportDetails = location?.state?.data;

  useEffect(() => {
    // dispatch(getReportDetails(reportId));
  }, [dispatch, reportId]);

  useEffect(() => {
    let user = Array.isArray(userProfiles) && userProfiles.find((profile) => profile.id === reportDetails?.createdBy);
    setUserFullName(`${user?.firstName} ${user?.lastName}`);
  }, [userProfiles, reportDetails?.createdBy]);

  const authorMetaData = {
    id: reportId,
    title: reportDetails?.reportTitle,
    author: userFullName,
    date: reportDetails?.createdAt ? formatDate(reportDetails?.createdAt) : ""
  };

  const reportDetailsObj = {
    achievements: {
      title: "Major Achievements",
      content: reportDetails?.achievements
    },
    blockers: {
      title: "Major Blockers",
      content: reportDetails?.blocker
    },
    recommendations: {
      title: "Major Recommendations",
      content: reportDetails?.recommendations
    }
  };

  const handleCloseReport = () => {
    router.push("/dashboard/reports/");
  };

  const handleShareReport = () => {
    dispatch(showModal({ name: "shareReport", modalData: "Share report via email" }));
  };

  const handleDownloadReport = () => {
    handleDownloadPDF();
    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: "Report downloaded successfully",
          image: successImage
        }
      })
    );
  };

  const handleDownloadPDF = () => {
    const parentElement = contentRef.current;
    const clonedElement = parentElement.cloneNode(true);
    const excludedElements = clonedElement.querySelectorAll(".exclude");

    excludedElements.forEach((element) => {
      element.remove();
    });

    html2pdf().set({ filename: "report.pdf" }).from(clonedElement).save();
  };

  return (
    <div ref={contentRef} className={cx(styles.reportDetailsContainer, "flexCol")}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <div className={cx(styles.body, "flexRow-align-center")}>
          <Image className={cx(styles.icon)} src={reportIcon} alt='icon' />
          <div className={cx(styles.mainContent, "flexCol")}>
            <h5 className={cx(styles.title)}>{authorMetaData?.title}</h5>
            <div className={cx(styles.metaData, "flexRow-align-center")}>
              <span className={cx(styles.name)}>By {authorMetaData?.author}</span>-
              <span className={cx(styles.date)}>{authorMetaData?.date}</span>
            </div>
          </div>
        </div>

        <Image
          className={cx(styles.closeIcon, "exclude")}
          onClick={() => handleCloseReport()}
          src={closeIcon}
          alt='close-icon'
        />
      </div>

      <div className={cx(styles.mainBody, "flexCol")}>
        {Object.keys(reportDetailsObj).map((key, index) => {
          return (
            <div key={index} className={cx(styles.reportDetails, "flexCol")}>
              <h5 className={cx(styles.title)}>{reportDetailsObj[key].title}</h5>
              <p className={cx(styles.content)}>{reportDetailsObj[key].content}</p>
            </div>
          );
        })}

        <div ref={btnGroupRef} className={cx(styles.btnGroup, "flexRow-space-between", "exclude")}>
          <Button onClick={() => handleShareReport()} title='Share' type='secondary' />
          <Button onClick={() => handleDownloadReport()} title='Download' />
        </div>
      </div>

      {displayModal && modalName === "shareReport" ? <ShareReportModal show size='md' /> : null}
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
};

export default ReportDetails;
