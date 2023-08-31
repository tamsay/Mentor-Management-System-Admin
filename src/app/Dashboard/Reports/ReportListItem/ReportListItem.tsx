import React from "react";
import cx from "classnames";
import Image from "next/image";
import { useParams } from "next/navigation";

import styles from "./ReportListItem.module.scss";

import formatDate from "@/helpers/formatDate";

function ReportListItem({ data }) {
  const { id } = useParams();

  return (
    <div className={cx(styles.reportListItemContainer, "flexCol", id === data.id && styles.activeItem)}>
      <div className={cx(styles.body, "flexRow-align-center")}>
        <Image src={data?.image} className={cx(styles.icon)} alt='icon' />
        <div className={cx(styles.mainContent, "flexCol")}>
          <h5 className={cx(styles.title)}>{data?.title}</h5>
          <div className={cx(styles.metaData, "flexRow-align-center")}>
            <span className={cx(styles.name)}>By {data.createdBy}</span>-
            <span className={cx(styles.date)}>{formatDate(data?.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportListItem;
