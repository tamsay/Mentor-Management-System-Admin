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
        <Image className={cx(styles.icon)} src={data?.icon} alt='icon' />
        <div className={cx(styles.mainContent, "flexCol")}>
          <h5 className={cx(styles.title)}>{data?.name}</h5>
          <span className={cx(styles.description)}>{data?.description}</span>
        </div>
        <div className={cx(styles.btnDiv, "flexRow")}>
          <Button title='View' btnType='primary' size='small' />
        </div>
      </div>
    </div>
  );
}

RecentListItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func
};

export default RecentListItem;
