"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import PersonelComponent from "../PersonelComponent/PersonelComponent";
import styles from "./CreateTask.module.scss";

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
import { createTask } from "@/redux/Tasks/TasksSlice";

import { createTaskSchema } from "@/helpers/validation";

// temp values for mentor and mentor manager arrays
import { mentorManagersArray, mentorsArray } from "@/constants/testData";

function CreateTask() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [openSideBar, setOpenSideBar] = useState({
    open: false,
    category: ""
  });
  const [collapseInput, setCollapseInput] = useState(true);
  const [selectedMentorManagers, setSelectedMentorManagers] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  const allMentorsData = useAppSelector((state) => state.mentors.getAllMentorsData);
  const allMentorManagersData = useAppSelector((state) => state.mentorManagers.getAllMentorManagersData);
  const createTaskLoading = useAppSelector((state) => state.loading.createTaskLoading);

  const allUserProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);

  useEffect(() => {
    dispatch(getAllMentors());
    dispatch(getAllMentorManagers());
    dispatch(getAllUserProfiles({ page: 1, pageSize: 10 }));
  }, [dispatch]);

  const resolver = yupResolver(createTaskSchema);

  const defaultValues = {
    title: "",
    description: ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ defaultValues, resolver, mode: "all" });

  const handleCreateTask = async (data) => {
    console.log(data);
    let formattedMentorManagerIds = selectedMentorManagers.map((id) => {
      return { mentorManagerId: id };
    });
    let formattedMentorIds = selectedMentors.map((id) => {
      return { programsMentorId: id };
    });

    let payload = {
      ...data,
      status: 3, // this would be changed later
      mentorManagers: formattedMentorManagerIds,
      mentors: formattedMentorIds
    };
    const response = await dispatch(createTask(payload));

    if (response?.success) {
      reset();
      setSelectedMentorManagers([]);
      setSelectedMentors([]);
      dispatch(
        showModal({
          name: "successNotification",
          modalData: {
            title: "Task created successfully",
            image: successImage,
            redirectUrl: "/dashboard/tasks"
          }
        })
      );
    }

    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: "Task created successfully",
          image: successImage,
          redirectUrl: "/dashboard/tasks"
        }
      })
    );
  };

  const handleOpenSideBar = (e, open, category) => {
    e.preventDefault();
    setOpenSideBar({ open, category });
  };

  const handleSearchInput = (e) => {
    console.log(e.target.value);
  };

  const getListComponents = (data, selectedUsers) => {
    const listItems = data.map((item) => {
      return {
        component: (
          <PersonelComponent
            key={item?.id}
            data={item}
            checked={selectedUsers.some((userId) => userId === item?.id)}
            handleChecked={handleSelectedItem}
          />
        ),
        id: item.id
      };
    });

    const headerComponent = (
      <>
        <div className={cx(styles.filterAndSearchDiv, "flexRow-align-center")}>
          {collapseInput && (
            <h6 className={cx(styles.title)}>
              {openSideBar?.category === "mentorManager" ? "Select Mentor Manager(s)" : "Select Mentor(s)"}
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
            />
          </div>

          <CloseIcon
            className={cx(styles.closeIcon)}
            alt='close-icon'
            onClick={() => setOpenSideBar({ open: false })}
          />
        </div>
      </>
    );

    return { listItems, headerComponent };
  };

  const handleSelectedItem = (itemId) => {
    if (openSideBar.category === "mentorManager") {
      if (selectedMentorManagers.find((userId) => userId === itemId)) {
        let filteredMentorManagers = selectedMentorManagers.filter((id) => id !== itemId);
        setSelectedMentorManagers(filteredMentorManagers);
      } else {
        setSelectedMentorManagers([...selectedMentorManagers, `${itemId}`]);
      }
    }
    if (openSideBar.category === "mentor") {
      if (selectedMentors.find((userId) => userId === itemId)) {
        let filteredMentors = selectedMentors.filter((id) => id !== itemId);
        setSelectedMentors(filteredMentors);
      } else {
        setSelectedMentors([...selectedMentors, `${itemId}`]);
      }
    }
  };

  const handleSideBarMenuClick = () => {
    // This is added to remove the warning of unused function in the selection sidebar component
  };

  const handleClearList = (category) => {
    if (category === "mentorManager") {
      setSelectedMentorManagers([]);
    } else if (category === "mentor") {
      setSelectedMentors([]);
    }
  };

  return (
    <div className={cx(styles.createTaskContainer, "flexRow")}>
      <div className={cx(styles.mainSection, "flexCol")}>
        <div className={cx(styles.heading, "flexRow-space-between")}>
          <h3 className={cx(styles.title)}>New Task</h3>
          <CloseIconAlt onClick={() => router.push("/dashboard/tasks")} alt='close-icon' />
        </div>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => handleCreateTask(data))}>
            <label htmlFor='title'>Title</label>
            <Controller
              name='title'
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  placeholder='Enter a title'
                  type='text'
                  error={errors?.title && errors?.title?.message}
                />
              )}
            />

            <label htmlFor='description'>Details</label>
            <Controller
              name='description'
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  placeholder='Enter task description'
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
            </div>

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button
                onClick={handleSubmit((data) => handleCreateTask(data))}
                loading={createTaskLoading}
                disabled={createTaskLoading}
                title='Create Task'
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

export default CreateTask;
