import React, { useEffect, useState } from "react";
import cx from "classnames";
import Image from "next/image";

import styles from "./PersonelComponent.module.scss";

import AddIcon from "@/assets/icons/add-icon.svg";
import CheckIcon from "@/assets/icons/check-icon.svg";

import { initialsCase, titleCase } from "@/helpers/textTransform";

type PersonelComponentProps = {
  data: Mentor | MentorManager;
  checked: boolean;
  handleChecked: (id: string) => void;
};

const PersonelComponent: React.FC<PersonelComponentProps> = ({ data, checked, handleChecked }) => {
  const [toggleIcon, setToggleIcon] = useState(false);

  useEffect(() => {
    setToggleIcon(checked);
  }, [checked]);

  const handleToggleIcon = () => {
    setToggleIcon(!toggleIcon);
    handleChecked(data?.id);
  };

  return (
    <div className={cx(styles.personelCompContainer, "flexRow-align-center")}>
      {data?.image ? (
        <Image className={cx(styles.avatar)} src={data?.image} alt='user-image' />
      ) : (
        <span className={cx(styles.avatarText, "flexRow-fully-centered")}>
          {initialsCase(`${data?.firstName} ${data?.lastName}`)}
        </span>
      )}
      <div className={cx(styles.userInfo, "flexCol")}>
        <h5 className={cx(styles.name)}>{`${titleCase(data?.firstName)} ${titleCase(data?.lastName)}`}</h5>
        <p className={cx(styles.designation)}>{data?.designation}</p>
        <div className={cx(styles.positionTags, "flexRow")}>
          {data?.positionTags &&
            data?.positionTags.map((tag, index) => (
              <span key={index} className={cx(styles.tag)}>
                {tag}
              </span>
            ))}
        </div>
      </div>
      {toggleIcon ? (
        <CheckIcon className={cx(styles.icon)} onClick={() => handleToggleIcon()} />
      ) : (
        <AddIcon className={cx(styles.icon)} onClick={() => handleToggleIcon()} />
      )}
    </div>
  );
};

export default PersonelComponent;
