import React from "react";
import { useParams } from "react-router-dom";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./RecentListItem.module.scss";

import Button from "@/components/Button/Button";

function RecentListItem({ data, onClick }) {
  const { id } = useParams();

  return (
    <div
      onClick={() => onClick(data)}
      className={cx(styles.recentListItemContainer, "flexCol", id === data?.id.toString() && styles.activeItem)}
    >
      <div className={cx(styles.body, "flexRow-align-center")}>
        <div className={cx(styles.imageDiv, "flexRow-fully-centered")}>
          <Image className={cx(styles.cardImage)} src={data?.cardImage} alt='icon' />
          <Image className={cx(styles.icon)} src={data?.icon} alt='icon' />
        </div>
        <div className={cx(styles.mainContent, "flexCol")}>
          <h5 className={cx(styles.title, data?.type === "program" && styles.multiLine)}>{data?.name}</h5>
          {data?.description && <span className={cx(styles.description)}>{data?.description}</span>}
        </div>
        {data?.type === "program" ? (
          data?.count && <span className={cx(styles.count, "flexRow-fully-centered")}>{data?.count}</span>
        ) : (
          <div className={cx(styles.btnDiv, "flexRow")}>
            <Button title='View' btnType='primary' size='small' />
          </div>
        )}
      </div>
    </div>
  );
}

RecentListItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
};

export default RecentListItem;
