"use client";

import React, { useEffect } from "react";
import cx from "classnames";
import { useParams, usePathname, useRouter } from "next/navigation";

import styles from "./page.module.scss";

import EmptySelectionIcon from "@/assets/icons/empty-selection-icon.svg";

const Tasks = () => {
  const selectedMenuId = useParams()?.id;
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (selectedMenuId) {
      router.push(`${pathname}/task-details/${selectedMenuId}`);
    }
  }, [pathname, router, selectedMenuId]);

  return (
    <div className={cx(styles.home)}>
      {selectedMenuId ? null : (
        <div className={cx(styles.emptySelectionDiv, "flexCol-fully-centered")}>
          <EmptySelectionIcon alt='empty-selection-icon' viewBox='0 0 51 51' />
          <p>No item selected yet </p>
          <p>Select an item from the list to view task details</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
