import React, { useEffect, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import cx from "classnames";
import styles from "./Privacy.module.scss";

import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import ToggleSwitch from "@/components/ToggleSwitch/ToggleSwitch";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { editUserPrivacy,getUserPrivacy } from "@/redux/Settings/SettingsSlice";



function Privacy() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state?.loading?.editUserPrivacyLoading);
  const getUserPrivacyLoading = useAppSelector((state) => state?.loading?.getUserPrivacyLoading);
  const userPrivacyData = useAppSelector((state) => state?.settings?.getUserPrivacyData);
  const [userPrivacyArray, setUserPrivacyArray] = useState([]);

  useEffect(() => {
    dispatch(getUserPrivacy());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(userPrivacyData).length > 0) {
      let array = Object.keys(userPrivacyData).map((key) => {
        switch (key) {
          case "showContactInfo":
            return {
              title: "Show contact info",
              key: key,
              value: userPrivacyData[key]
            };
          case "showGithub":
            return {
              title: "Show GitHub",
              key: key,
              value: userPrivacyData[key]
            };
          case "showInstagram":
            return {
              title: "Show Instagram",
              key: key,
              value: userPrivacyData[key]
            };
          case "showLinkedIn":
            return {
              title: "Show LinkedIn",
              key: key,
              value: userPrivacyData[key]
            };
          case "showTwitter":
            return {
              title: "Show Twitter",
              key: key,
              value: userPrivacyData[key]
            };
          default:
            break;
        }
      });
      setUserPrivacyArray(array);
    }
  }, [userPrivacyData, getUserPrivacyLoading]);

  const handleEditUserPrivacy = async (data) => {
    let response = await dispatch(editUserPrivacy(data));
    response?.success && dispatch(getUserPrivacy());
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ mode: "all" });

  useEffect(() => {
    reset(userPrivacyData);
  }, [reset, userPrivacyData]);

  return (
    <div className={cx(styles.privacyContainer, "flexCol")}>
      {Object.keys(userPrivacyData).length === 0 ? (
        <Loader small={false} />
      ) : (
        <form
          className={cx(styles.formWrapper, "flexCol")}
          onSubmit={handleSubmit((data) => handleEditUserPrivacy(data))}
        >
          {Array.isArray(userPrivacyArray) &&
            userPrivacyArray.map((category) => {
              return (
                <div className={cx(styles.infoWrapper, "flexRow-space-between")} key={category?.key}>
                  <h6 className={cx(styles.infoTitle)}>{category.title}</h6>
                  <div className={cx(styles.switchWrapper, "flexRow")}>
                    <Controller
                      name={`${category?.key}`}
                      control={control}
                      render={({ field }) => (
                        <ToggleSwitch
                          {...field}
                          error={errors[`${category?.key}`] && errors[`${category?.key}`]?.message}
                          checkedStatus={category.value}
                        />
                      )}
                    />
                  </div>
                </div>
              );
            })}
          <Button
            loading={loading}
            disabled={loading}
            onClick={handleSubmit((data) => handleEditUserPrivacy(data))}
            title='Save Changes'
          />
        </form>
      )}
    </div>
  );
}

export default Privacy;
