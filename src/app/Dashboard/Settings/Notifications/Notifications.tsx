import React, { useEffect, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import cx from "classnames";
import styles from "./Notifications.module.scss";

import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editUserNotifications,getUserNotifications } from "@/redux/Settings/SettingsSlice";

import { titleCase } from "@/helpers/textTransform";



function Notifications() {
  const dispatch = useAppDispatch();
  const userNotificationsData = useAppSelector((state) => state?.settings?.getUserNotificationsData);
  const loading = useAppSelector((state) => state?.loading?.editUserNotificationsLoading);

  const [formattedDataObj, setFormattedDataObj] = useState({});

  useEffect(() => {
    dispatch(getUserNotifications());
  }, [dispatch]);

  useEffect(() => {
    let formattedDataObj = {};

    let generalListObj = {
      allNotification: "All Notifications",
      program: "Programs",
      task: "Tasks",
      approvalRequest: "Approval Requests",
      reports: "Reports"
    };

    let discussionListObj = {
      postComments: "Comments on my post",
      posts: "Posts",
      comments: "Comments",
      mentions: "Mentions",
      directMessage: "Direct Messages"
    };

    if (Object.keys(userNotificationsData).length > 0) {
      Object.keys(userNotificationsData).map((key) => {
        let slicedKey = key.slice(0, -5);
        let category = key.slice(-5).toLowerCase();

        if (generalListObj[slicedKey]) {
          formattedDataObj["general"] = formattedDataObj["general"] || {};
          formattedDataObj.general[slicedKey] = {
            ...formattedDataObj.general[slicedKey],
            [category]: userNotificationsData[key],
            title: generalListObj[slicedKey]
          };
        } else if (discussionListObj[slicedKey]) {
          formattedDataObj["discussion"] = formattedDataObj["discussion"] || {};
          formattedDataObj.discussion[slicedKey] = {
            ...formattedDataObj.discussion[slicedKey],
            [category]: userNotificationsData[key],
            title: discussionListObj[slicedKey]
          };
        }
      });
    }
    setFormattedDataObj(formattedDataObj);
  }, [userNotificationsData]);

  const handleEditUserNotifications = async (data) => {
    let response = await dispatch(editUserNotifications(data));
    response?.success && dispatch(getUserNotifications());
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm({ mode: "all" });

  const handleToggleChange = (status, key) => {
    let copiedList = { ...formattedDataObj };

    if (key === "allNotificationEmail") {
      Object.keys(copiedList).map((item) => {
        Object.keys(copiedList[item]).map((categories) => {
          copiedList[item][categories].email = status;
          setValue(`${categories}Email`, status);
        });
      });
      setFormattedDataObj(copiedList);
    } else if (key === "allNotificationInApp") {
      Object.keys(copiedList).map((item) => {
        Object.keys(copiedList[item]).map((categories) => {
          copiedList[item][categories].inapp = status;
          setValue(`${categories}InApp`, status);
        });
      });
      setFormattedDataObj(copiedList);
    } else {
      setValue(key, status);
    }
  };

  useEffect(() => {
    reset(userNotificationsData);
  }, [reset, userNotificationsData]);

  return (
    <div className={cx(styles.notificationsContainer, "flexCol")}>
      {Object.keys(formattedDataObj).length === 0 ? (
        <Loader small={false} />
      ) : (
        <form
          className={cx(styles.formWrapper, "flexCol")}
          onSubmit={handleSubmit((data) => handleEditUserNotifications(data))}
        >
          {Object.keys(formattedDataObj).map((key, index) => {
            return (
              <div className={cx(styles.wrapper, "flexCol")} key={index}>
                <h6 className={cx(styles.heading)}>
                  {titleCase(key)} Notifications {key}
                </h6>
                <div className={cx(styles.toggleHeadersWrapper, "flexRow-right-centered")}>
                  <h6 className={cx(styles.title)}>Email</h6>
                  <h6 className={cx(styles.title)}>In-app</h6>
                </div>
                {Object.keys(formattedDataObj[key]).map((item, index) => {
                  return (
                    <div className={cx(styles.infoWrapper, "flexRow-space-between")} key={index}>
                      <h6 className={cx(styles.infoTitle)}>{formattedDataObj[key][item].title}</h6>
                      <div className={cx(styles.switchWrapper, "flexRow")}>
                        <Controller
                          name={`${item}Email`}
                          control={control}
                          render={({ field }) => (
                            <ToggleSwitch
                              {...field}
                              error={errors[`${item}Email`] && errors[`${item}Email`]?.message}
                              checkedStatus={formattedDataObj[key][item].email}
                              onChange={(status) => {
                                handleToggleChange(status, `${item}Email`);
                              }}
                            />
                          )}
                        />

                        <Controller
                          name={`${item}InApp`}
                          control={control}
                          render={({ field }) => (
                            <ToggleSwitch
                              {...field}
                              error={errors[`${item}InApp`] && errors[`${item}InApp`]?.message}
                              checkedStatus={formattedDataObj[key][item].inapp}
                              onChange={(status) => {
                                handleToggleChange(status, `${item}InApp`);
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <Button
            loading={loading}
            disabled={loading}
            onClick={handleSubmit((data) => handleEditUserNotifications(data))}
            title='Save Changes'
          />
        </form>
      )}
    </div>
  );
}

export default Notifications;
