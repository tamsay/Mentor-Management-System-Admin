"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import cx from "classnames";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./EditCriteria.module.scss";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import CriteriaTypesModal from "@/components/Modals/CriteriaTypes/CriteriaTypes";
import FileInputModal from "@/components/Modals/CriteriaTypes/FileInput/FileInput";
import MultiChoiceModal from "@/components/Modals/CriteriaTypes/MultiChoice/MultiChoice";
import MultipleInputModal from "@/components/Modals/CriteriaTypes/MultipleInput/MultipleInput";
import SingleInputModal from "@/components/Modals/CriteriaTypes/SingleInput/SingleInput";
import YesOrNoModal from "@/components/Modals/CriteriaTypes/YesOrNo/YesOrNo";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import BackIcon from "@/assets/icons/close-icon.svg";
import EditIcon from "@/assets/icons/edit-icon-thin.svg";
import DeleteIcon from "@/assets/icons/minus-icon-thin.svg";
import successImage from "@/assets/images/default-success-notification-image.png";

import { getCriteriaFromStorage, saveCriteriaToStorage } from "@/redux/Criteria/CriteriaSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";

import { editProgramCriteriaSchema } from "@/helpers/validation";

const EditCriteria = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const criteriaData = useAppSelector((state) => state?.criteria?.getCriteriaFromStorageData);

  const [displayInstructions, setDisplayInstructions] = useState(true);
  const [disableCreateBtn, setDisableCreateBtn] = useState(true);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  useEffect(() => {
    dispatch(getCriteriaFromStorage());
  }, [dispatch]);

  console.log(criteriaData, "criteriaData from localstorage edit page");

  useEffect(() => {
    if (!criteriaData) {
      setDisableCreateBtn(true);
    } else if (Object.keys(criteriaData).length > 0) {
      if (Object.values(criteriaData).some((item) => item.length > 0)) {
        setDisableCreateBtn(false);
      } else {
        setDisableCreateBtn(true);
      }
    }
  }, [criteriaData]);

  const handleDisplayInstructions = () => {
    setDisplayInstructions(false);
  };

  const resolver = yupResolver(editProgramCriteriaSchema);

  const defaultValues = {
    title: "",
    details: ""
  };

  const { handleSubmit } = useForm({ defaultValues, resolver, mode: "all" });

  const handleCreateCriteria = (data) => {
    console.log(data, "form data");
    console.log(criteriaData, "criteriaData");

    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: "Criteria Modified Successfully!",
          image: successImage,
          redirectUrl: "/dashboard/programs/edit-program/1"
        }
      })
    );
  };

  const displayCriteriaTypes = (e) => {
    e.preventDefault();

    dispatch(
      showModal({
        name: "criteriaTypes",
        modalData: {
          title: "Select Input Type"
        }
      })
    );
  };

  const handleDeleteGroup = (category, index) => {
    let tempData = JSON.parse(JSON.stringify(criteriaData));

    let selectedGroup = tempData[category].find((item) => item.id === index);
    let groupIndex = tempData[category].indexOf(selectedGroup);
    tempData[category].splice(groupIndex, 1);

    dispatch(saveCriteriaToStorage(tempData));
    dispatch(getCriteriaFromStorage());
  };

  const handleDeleteSubGroup = (category, index, subIndex) => {
    let tempData = JSON.parse(JSON.stringify(criteriaData));

    let selectedSubGroup = tempData[category]
      .find((item) => item.id === index)
      .options.find((_, index) => index === subIndex);
    let subGroupIndex = tempData[category].find((item) => item.id === index).options.indexOf(selectedSubGroup);

    tempData[category].find((item) => item.id === index).options.splice(subGroupIndex, 1);

    dispatch(saveCriteriaToStorage(tempData));
    dispatch(getCriteriaFromStorage());
  };

  const handleEditGroup = (category, index) => {
    dispatch(
      showModal({
        name: category,
        modalData: {
          type: category,
          edit: true,
          groupIndex: index
        }
      })
    );
  };

  const getSingleInputContents = (category, item) => {
    return (
      Array.isArray(item) &&
      item.map((element) => {
        return (
          <div className={cx(styles.singleInputWrapper, "flexCol")} key={element?.id}>
            <p className={cx(styles.title)}>{element?.question}</p>
            <InputField type='text' placeholder='Single input response here' readOnly marginbottom={"0.5rem"} />
            <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
              <EditIcon onClick={() => handleEditGroup(category, element?.id)} alt='edit-icon' />
              <DeleteIcon onClick={() => handleDeleteGroup(category, element?.id)} alt='delete-icon' />
            </div>
          </div>
        );
      })
    );
  };

  const getMultipleInputContents = (category, item) => {
    return (
      Array.isArray(item) &&
      item.map((element) => {
        return (
          <div className={cx(styles.multipleInputWrapper, "flexCol")} key={element?.id}>
            <p className={cx(styles.title)}>{element?.question}</p>
            {Array(element?.numberOfInputs * 1)
              .fill(0)
              .map((_, index) => {
                return (
                  <InputField
                    key={index}
                    type='text'
                    placeholder={`Multiple input ${index + 1} response here`}
                    readOnly
                    marginbottom={"0.5rem"}
                  />
                );
              })}
            <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
              <EditIcon onClick={() => handleEditGroup(category, element?.id)} alt='edit-icon' />
              <DeleteIcon onClick={() => handleDeleteGroup(category, element?.id)} alt='delete-icon' />
            </div>
          </div>
        );
      })
    );
  };

  const getYesOrNoContents = (category, item) => {
    return (
      Array.isArray(item) &&
      item.map((element) => {
        return (
          <div className={cx(styles.yesOrNoWrapper, "flexCol")} key={element?.id}>
            <p className={cx(styles.title)}>{element?.question}</p>
            <div className={cx(styles.radioBtnGroup, "flexRow")}>
              <div className={cx(styles.group, "flexRow")}>
                <input type='radio' name='yes' id='yes' />
                <label htmlFor='yes'>Yes</label>
              </div>
              <div className={cx(styles.group, "flexRow")}>
                <input type='radio' name='no' id='no' />
                <label htmlFor='no'>No</label>
              </div>
            </div>
            <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
              <EditIcon onClick={() => handleEditGroup(category, element?.id)} alt='edit-icon' />
              <DeleteIcon onClick={() => handleDeleteGroup(category, element?.id)} alt='delete-icon' />
            </div>
          </div>
        );
      })
    );
  };

  const getMultiChoiceContents = (category, item) => {
    return (
      Array.isArray(item) &&
      item.map((element) => {
        return (
          <div className={cx(styles.multiChoiceWrapper, "flexCol")} key={element?.id}>
            <p className={cx(styles.title)}>{element?.question}</p>
            {Array.isArray(element?.options) &&
              element?.options.map((input, index) => {
                return (
                  <div key={index} className={cx(styles.wrapper, "flexRow-align-center")}>
                    <p className={cx(styles.fileName)}>{`${input?.option}`}</p>
                    <div className={cx(styles.rightGroup, "flexRow-align-center")}>
                      <DeleteIcon
                        onClick={() => handleDeleteSubGroup(category, element?.id, index)}
                        alt='delete-icon'
                      />
                    </div>
                  </div>
                );
              })}
            <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
              <EditIcon onClick={() => handleEditGroup(category, element?.id)} alt='edit-icon' />
              <DeleteIcon onClick={() => handleDeleteGroup(category, element?.id)} alt='delete-icon' />
            </div>
          </div>
        );
      })
    );
  };

  const getFileInputContents = (category, item) => {
    return (
      Array.isArray(item) &&
      item.map((element) => {
        return (
          <div className={cx(styles.fileInputWrapper, "flexCol")} key={element?.id}>
            <p className={cx(styles.title)}>{element?.question}</p>
            {Array.isArray(element?.options) &&
              element?.options.map((input, index) => {
                return (
                  <div key={index} className={cx(styles.wrapper, "flexRow-align-center")}>
                    <p className={cx(styles.fileName)}>{`${input?.fileName}.${input?.fileType}`}</p>
                    <div className={cx(styles.rightGroup, "flexRow-align-center")}>
                      <span>Choose</span>
                      <DeleteIcon
                        onClick={() => handleDeleteSubGroup(category, element?.id, index)}
                        alt='delete-icon'
                      />
                    </div>
                  </div>
                );
              })}
            <div className={cx(styles.btnGroup, "flexRow-right-centered")}>
              <EditIcon onClick={() => handleEditGroup(category, element?.id)} alt='edit-icon' />
              <DeleteIcon onClick={() => handleDeleteGroup(category, element?.id)} alt='delete-icon' />
            </div>
          </div>
        );
      })
    );
  };

  const handleDisplayContents = (item, category) => {
    switch (category) {
      case "singleInput":
        return getSingleInputContents(category, item);
      case "multipleInput":
        return getMultipleInputContents(category, item);
      case "yesOrNo":
        return getYesOrNoContents(category, item);
      case "multiChoice":
        return getMultiChoiceContents(category, item);
      case "fileInput":
        return getFileInputContents(category, item);
      default:
        return null;
    }
  };

  return (
    <div className={cx(styles.editCriteriaContainer, "flexCol")}>
      <div className={cx(styles.heading, "flexRow-space-between")}>
        <h3 className={cx(styles.title)}>Criteria Setup</h3>
        <BackIcon onClick={() => router.back()} className={cx(styles.backIcon)} alt='close-icon' />
      </div>
      <div className={cx(styles.body, "flexCol")}>
        {displayInstructions ? (
          <div className={cx(styles.instructions, "flexCol")}>
            <p>
              To be accepted as a mentor or a mentor manager, an applicant must provide relevant information and
              documents regarding their past experience(s). The criteria setup lets you create input fields for these
              information.
            </p>
            <Button onClick={() => handleDisplayInstructions()} title='Ok' btnType='primary' size='small' />
          </div>
        ) : (
          <form
            className={cx(styles.formContainer, "flexCol")}
            onSubmit={handleSubmit((data) => handleCreateCriteria(data))}
          >
            <div className={cx(styles.formBody, "flexCol")}>
              <div className={cx(styles.contentWrapper, "flexCol")}>
                {criteriaData &&
                  Object.keys(criteriaData) &&
                  Object.keys(criteriaData).map((category) => {
                    return handleDisplayContents(criteriaData[category], category);
                  })}
              </div>
              <div className={cx(styles.addCriteriaBtnDiv, "flexRow")}>
                <Button onClick={(e) => displayCriteriaTypes(e)} title='Add Criteria' btnType='primary' size='small' />
              </div>
              <div className={cx(styles.submitBtnDiv, "flexRow")}>
                <Button
                  onClick={handleSubmit((data) => handleCreateCriteria(data))}
                  title='Save'
                  btnType='primary'
                  disabled={disableCreateBtn}
                />
              </div>
            </div>
          </form>
        )}
      </div>

      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='lg' /> : null}
      {displayModal && modalName === "criteriaTypes" ? <CriteriaTypesModal show size='lg' /> : null}
      {displayModal && modalName === "singleInput" ? <SingleInputModal show size='lg' /> : null}
      {displayModal && modalName === "multipleInput" ? <MultipleInputModal show size='lg' /> : null}
      {displayModal && modalName === "yesOrNo" ? <YesOrNoModal show size='lg' /> : null}
      {displayModal && modalName === "multiChoice" ? <MultiChoiceModal show size='lg' /> : null}
      {displayModal && modalName === "fileInput" ? <FileInputModal show size='lg' /> : null}
    </div>
  );
};

export default EditCriteria;
