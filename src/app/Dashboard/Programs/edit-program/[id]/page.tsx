"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import PersonelComponent from "../../PersonelComponent/PersonelComponent";
// import { ProgramDetails } from "../../types";
import styles from "./EditProgram.module.scss";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";
import Search from "@/components/Search/Search";
import SelectionSideBar from "@/components/SelectionSideBar/SelectionSideBar";
import TextArea from "@/components/TextArea/TextArea";

import ClearListIcon from "@/assets/icons/clear-list-icon.svg";
import CloseIconAlt from "@/assets/icons/close-icon.svg";
import CloseIcon from "@/assets/icons/undo-icon.svg";
import successImage from "@/assets/images/create-task-success-image.svg?url";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllMentorManagers } from "@/redux/MentorManagers/MentorManagersSlice";
import { getAllMentors } from "@/redux/Mentors/MentorsSlice";
import { showModal } from "@/redux/Modal/ModalSlice";
import { getAllUserProfiles } from "@/redux/Profile/ProfileSlice";
import { editProgram, getProgramDetails } from "@/redux/Programs/ProgramsSlice";

import { editProgramSchema } from "@/helpers/validation";

// to be removed when the endpoint is fixed
import { mentorManagersArray, mentorsArray, programsListArray } from "@/constants/testData";
function EditProgram({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const programId = params.id;

  const [openSideBar, setOpenSideBar] = useState({
    open: false,
    category: ""
  });
  const [collapseInput, setCollapseInput] = useState(true);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  // const programDetails = useAppSelector((state) => state.programs.getProgramDetailsData) as ProgramDetails;
  const programDetails = programsListArray.find((item) => item.id === programId) as unknown as ProgramDetails;
  const allUserProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);
  const editProgramLoading = useAppSelector((state) => state.loading.editProgramLoading);

  const [selectedMentorManagers, setSelectedMentorManagers] = useState(programDetails.mentorManagers || []);
  const [selectedMentors, setSelectedMentors] = useState(programDetails.mentors || []);
  let tempCriteriaData = localStorage.getItem("criteria");
  const criteriaData = tempCriteriaData ? JSON.parse(tempCriteriaData) : {};
  console.log(criteriaData, "criteria data here");

  useEffect(() => {
    dispatch(getAllMentors());
    dispatch(getAllMentorManagers());
    dispatch(getAllUserProfiles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProgramDetails(programId));
  }, [dispatch, programId]);

  const resolver = yupResolver(editProgramSchema);

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({ resolver, mode: "all" });

  useEffect(() => {
    reset({
      name: programDetails.name || "",
      description: programDetails.description || ""
    });
    setSelectedMentorManagers(programDetails.mentorManagers || []);
    setSelectedMentors(programDetails.mentors || []);
  }, [
    programDetails.criteria,
    programDetails.description,
    programDetails.mentorManagers,
    programDetails.mentors,
    programDetails.name,
    reset
  ]);

  const handleEditProgram = async (data: { name: string; description: string }) => {
    let formattedMentorManagerIds = selectedMentorManagers.map((user) => {
      user.id;
    });
    let formattedMentorIds = selectedMentors.map((user) => {
      user.id;
    });

    let payload = {
      ...data,
      id: programId,
      image: uploadedFile?.imagePreviewUrl || programDetails.image,
      archivedBy: programDetails.archivedBy || "", // this will be replaced later - it ought to be done at the backend
      createdBy: programDetails.createdBy || "", // this will be replaced later - it ought to be done at the backend
      status: 1, // this will be replaced later - it ought to be done at the backend
      criteria: JSON.stringify(localStorage.getItem("criteria")) || "",
      mentorManagers: formattedMentorManagerIds,
      mentors: formattedMentorIds
    };

    let response = await dispatch(editProgram(payload));
    if (response.success) {
      dispatch(
        showModal({
          name: "successNotification",
          modalData: {
            title: "Program Edited Successfully!",
            image: successImage,
            redirectUrl: "/dashboard/programs"
          }
        })
      );
      localStorage.removeItem("criteria");
    }
  };

  const handleOpenSideBar = (e: { preventDefault: () => void }, open: boolean, category: string) => {
    e.preventDefault();
    setOpenSideBar({ open, category });
  };

  const handleSearchInput = (e: { target: { value: any } }) => {
    console.log(e.target.value);
  };

  const handleCloseSelectElement = () => {
    // Added to prevent console errors
  };

  const getListComponents = (data: Mentor[] | MentorManager[], selectedUsers: Mentor[] | MentorManager[]) => {
    const listItems =
      Array.isArray(data) &&
      data.map((item, index) => {
        return {
          component: (
            <PersonelComponent
              key={index}
              data={item}
              checked={selectedUsers.some((user: { id: any }) => user?.id === item?.id)}
              handleChecked={handleSelectedItem}
            />
          ),
          id: item.id
        };
      });

    const headerComponent = (
      <div className={cx(styles.filterAndSearchDiv, "flexRow-align-center")}>
        {collapseInput && (
          <h6 className={cx(styles.title)}>
            {openSideBar?.category === "mentor-manager" ? "Select Mentor Manager(s)" : "Select Mentor(s)"}
          </h6>
        )}
        <div className={cx(styles.searchWrapper)}>
          <Search
            inputPlaceholder={
              openSideBar?.category === "mentorManager" ? "Search for Mentor Manager" : "Search for Mentor"
            }
            onChange={handleSearchInput}
            collapseInput={collapseInput}
            setCollapseInput={setCollapseInput}
            closeSelectElement={handleCloseSelectElement}
          />
        </div>
        <CloseIcon
          className={cx(styles.closeIcon)}
          alt='close-icon'
          onClick={() => setOpenSideBar({ ...openSideBar, open: false })}
        />
      </div>
    );

    return { listItems, headerComponent };
  };

  const handleSelectedItem = (itemId: string) => {
    if (openSideBar.category === "mentorManager") {
      if (selectedMentorManagers.find((user) => user.id === itemId)) {
        let filteredMentorManagers = selectedMentorManagers.filter((user) => user.id !== itemId);
        setSelectedMentorManagers(filteredMentorManagers);
      } else {
        setSelectedMentorManagers([...selectedMentorManagers, mentorManagersArray.find((user) => user.id === itemId)]);
      }
    }
    if (openSideBar.category === "mentor") {
      if (selectedMentors.find((user) => user.id === itemId)) {
        let filteredMentors = selectedMentors.filter((user) => user.id !== itemId);
        setSelectedMentors(filteredMentors);
      } else {
        setSelectedMentors([...selectedMentors, mentorsArray.find((user) => user.id === itemId)]);
      }
    }
  };

  const [uploadedFile, setUploadedFile] = useState({
    file: "",
    imagePreviewUrl: ""
  });

  const onDrop = useCallback((acceptedFiles: any[]) => {
    let file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedFile({ file: file, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps } = useDropzone({ onDrop, accept: "image/*" });

  const handleDragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleDropzoneClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const handleEditCriteria = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push(`${pathname}/edit-criteria`);
  };

  const handleClearList = (category: string) => {
    if (category === "mentorManager") {
      setSelectedMentorManagers([]);
    } else if (category === "mentor") {
      setSelectedMentors([]);
    }
  };

  const handleSideBarMenuClick = () => {
    // This is added to remove the warning of unused function in the selection sidebar component
  };

  return (
    <div className={cx(styles.editProgramContainer, "flexRow")}>
      <div className={cx(styles.mainSection, "flexCol")}>
        <div className={cx(styles.heading, "flexRow-space-between")}>
          <h3 className={cx(styles.title)}>Edit Program</h3>
          <CloseIconAlt alt='close-icon' onClick={() => router.push("/dashboard/programs")} />{" "}
        </div>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => handleEditProgram(data))}>
            <div className={cx(styles.headerWrapper, "flexRow")}>
              <div className={cx(styles.leftSection, styles.imageDiv)}>
                {uploadedFile?.imagePreviewUrl || programDetails.image ? (
                  <Image
                    {...getRootProps({ onDragOver: handleDragOver, onClick: handleDropzoneClick })}
                    src={uploadedFile?.imagePreviewUrl ? uploadedFile?.imagePreviewUrl : programDetails.image}
                    width={100}
                    height={100}
                    alt='profile-image'
                  />
                ) : (
                  <span {...getRootProps({ onDragOver: handleDragOver, onClick: handleDropzoneClick })}>
                    Select Image
                  </span>
                )}
              </div>
              <div className={cx(styles.rightSection, "flexCol")}>
                <h5 className={cx(styles.title)}>Set Program Avatar</h5>
                <Button
                  {...getRootProps({ onDragOver: handleDragOver, onClick: handleDropzoneClick })}
                  title='Select file'
                  size='small'
                  btnType='secondary'
                />
              </div>
            </div>

            <label htmlFor='name'>Program Name</label>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Enter program name'
                  type='text'
                  error={errors?.name && errors?.name?.message}
                />
              )}
            />

            <label htmlFor='description'>Program Description</label>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder='Enter description'
                  minHeight='150px'
                  error={errors?.description && errors?.description?.message}
                />
              )}
            />

            <div className={cx(styles.selectionDiv, "flexRow-space-between")}>
              <div className={cx(styles.wrapper, "flexRow-align-center")}>
                <div className={cx(styles.leftSide, "flexCol")}>
                  <h6 className={cx(styles.title)}>Add Mentor Manager</h6>
                  <div className={cx(styles.statsDiv, "flexRow")}>
                    <span className={cx(styles.stats)}>{selectedMentorManagers.length} selected</span>
                    <ClearListIcon onClick={() => handleClearList("mentorManager")} />
                  </div>
                </div>
                <Button title='Select' size='small' onClick={(e) => handleOpenSideBar(e, true, "mentorManager")} />
              </div>

              <div className={cx(styles.wrapper, "flexRow-align-center")}>
                <div className={cx(styles.leftSide, "flexCol")}>
                  <h6 className={cx(styles.title)}>Add Mentor</h6>
                  <div className={cx(styles.statsDiv, "flexRow")}>
                    <span className={cx(styles.stats)}>{selectedMentors.length} selected</span>
                    <ClearListIcon onClick={() => handleClearList("mentor")} />
                  </div>
                </div>
                <Button title='Select' size='small' onClick={(e) => handleOpenSideBar(e, true, "mentor")} />
              </div>

              <div className={cx(styles.wrapper, "flexRow-align-center")}>
                <div className={cx(styles.leftSide, "flexCol")}>
                  <h6 className={cx(styles.title)}>Edit Criteria</h6>
                  <div className={cx(styles.statsDiv, "flexRow")}>
                    <span className={cx(styles.stats)}>
                      {criteriaData && Object.keys(criteriaData).length} selected
                    </span>
                    <ClearListIcon />
                  </div>
                </div>
                <Button title='Select' size='small' onClick={(e) => handleEditCriteria(e)} />
              </div>
            </div>

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button
                onClick={handleSubmit((data) => handleEditProgram(data))}
                loading={editProgramLoading}
                disabled={editProgramLoading}
                title='Save Changes'
                btnType='primary'
              />
            </div>
          </form>
        </div>
      </div>

      {openSideBar.open && openSideBar.category === "mentorManager" ? (
        <div className={cx(styles.sideBarSection)}>
          <SelectionSideBar
            selectedMenuItem={handleSideBarMenuClick}
            data={getListComponents(mentorManagersArray, selectedMentorManagers)}
          />
        </div>
      ) : openSideBar.open && openSideBar.category === "mentor" ? (
        <div className={cx(styles.sideBarSection)}>
          <SelectionSideBar
            selectedMenuItem={handleSideBarMenuClick}
            data={getListComponents(mentorsArray, selectedMentors)}
          />
        </div>
      ) : null}

      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
}

export default EditProgram;
