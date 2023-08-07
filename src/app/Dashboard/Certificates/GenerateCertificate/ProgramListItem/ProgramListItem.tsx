// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import styles from "./ProgramListItem.module.scss";

import { ReactComponent as AddIcon } from "@/assets/icons/add-icon.svg";
// import { ReactComponent as CheckIcon } from "@/assets/icons/check-icon.svg";

function ProgramListItem({ data, onClick }) {
  // const [toggleIcon, setToggleIcon] = useState(false);

  return (
    <div className={cx(styles.programListItemContainer, "flexRow-align-center")}>
      <Image className={cx(styles.avatar)} src={data?.icon} alt='user-image' />
      <div className={cx(styles.userInfo, "flexCol")}>
        <h5 className={cx(styles.name)}>{data?.name}</h5>
      </div>
      {/* {toggleIcon ? (
        <CheckIcon className={cx(styles.icon)} onClick={() => setToggleIcon(!toggleIcon)} />
      ) : (
        <AddIcon className={cx(styles.icon)} onClick={() => setToggleIcon(!toggleIcon)} />
      )} */}
      <AddIcon className={cx(styles.icon)} onClick={() => onClick(data)} />
    </div>
  );
}

ProgramListItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

export default ProgramListItem;
