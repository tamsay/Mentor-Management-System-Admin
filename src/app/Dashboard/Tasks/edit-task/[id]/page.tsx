"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import PersonelComponent from "../../PersonelComponent/PersonelComponent";
import styles from "./EditTask.module.scss";

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
import { editTask, getTaskDetails } from "@/redux/Tasks/TasksSlice";

import { editTaskSchema } from "@/helpers/validation";

// to be removed when the endpoint is fixed
import { mentorManagersArray, mentorsArray, programsListArray, tasksListArray } from "@/constants/testData";

const EditTask = ({ params }: { params: { id: string } }) => {
  const taskId = params.id;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [openSideBar, setOpenSideBar] = useState({
    open: false,
    category: ""
  });
  const [collapseInput, setCollapseInput] = useState(true);
  const [selectedMentorManagers, setSelectedMentorManagers] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);
  // const taskDetails = useAppSelector((state) => state.tasks.getTaskDetailsData);
  const taskDetails = tasksListArray.find((task) => task.id === taskId);
  const allMentorsData = useAppSelector((state) => state.mentors.getAllMentorsData);
  const allMentorManagersData = useAppSelector((state) => state.mentorManagers.getAllMentorManagersData);
  const editTaskLoading = useAppSelector((state) => state.loading.editTaskLoading);

  const allUserProfilesData = useAppSelector((state) => state.profile.getAllUserProfilesData);

  useEffect(() => {
    dispatch(getAllMentors());
    dispatch(getAllMentorManagers());
    dispatch(getAllUserProfiles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  const resolver = yupResolver(editTaskSchema);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({ resolver, mode: "all" });

  useEffect(() => {
    reset({
      title: taskDetails?.title,
      description: taskDetails?.description
    });
    setSelectedMentorManagers(taskDetails.mentorManagers || []);
    setSelectedMentors(taskDetails.mentors || []);
  }, [reset, taskDetails.mentorManagers, taskDetails.mentors, taskDetails?.title, taskDetails?.description]);

  const handleEditTask = async (data: { name: string; description: string }) => {
    let formattedMentorManagerIds = selectedMentorManagers.map((user) => {
      user.id;
    });
    let formattedMentorIds = selectedMentors.map((user) => {
      user.id;
    });

    let payload = {
      ...data,
      id: taskId,
      mentorManagers: formattedMentorManagerIds,
      mentors: formattedMentorIds
    };

    const response = await dispatch(editTask(payload));
    if (response.success) {
      setSelectedMentorManagers([]);
      setSelectedMentors([]);

      dispatch(
        showModal({
          name: "successNotification",
          modalData: {
            title: "Task updated successfully",
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
          title: "Task updated successfully",
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
    let listItems = data.map((item) => {
      return {
        component: (
          <PersonelComponent
            key={item?.id}
            data={item}
            checked={selectedUsers.some((userId) => userId.id === item?.id)}
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
    <div className={cx(styles.editTaskContainer, "flexRow")}>
      <div className={cx(styles.mainSection, "flexCol")}>
        <div className={cx(styles.heading, "flexRow-space-between")}>
          <h3 className={cx(styles.title)}>Edit Task</h3>
          <CloseIconAlt onClick={() => router.push("/dashboard/tasks")} alt='close-icon' />
        </div>

        <div className={cx(styles.formWrapper, "flexCol")}>
          <form onSubmit={handleSubmit((data) => handleEditTask(data))}>
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
                  placeholder={"Enter task description"}
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
                    <span className={cx(styles.stats)}>
                      {Array.isArray(selectedMentorManagers) && selectedMentorManagers.length} selected
                    </span>
                    <ClearListIcon onClick={() => handleClearList("mentorManager")} />
                  </div>
                </div>
                <Button title='Select' size='small' onClick={(e) => handleOpenSideBar(e, true, "mentorManager")} />
              </div>

              <div className={cx(styles.wrapper, "flexRow-align-center")}>
                <div className={cx(styles.leftSide, "flexCol")}>
                  <h6 className={cx(styles.title)}>Add Mentor</h6>
                  <div className={cx(styles.statsDiv, "flexRow")}>
                    <span className={cx(styles.stats)}>
                      {Array.isArray(selectedMentors) && selectedMentors.length} selected
                    </span>
                    <ClearListIcon onClick={() => handleClearList("mentor")} />
                  </div>
                </div>
                <Button title='Select' size='small' onClick={(e) => handleOpenSideBar(e, true, "mentor")} />
              </div>
            </div>

            <div className={cx(styles.submitBtnDiv, "flexRow")}>
              <Button
                onClick={handleSubmit((data) => handleEditTask(data))}
                loading={editTaskLoading}
                disabled={editTaskLoading}
                title='Update Task'
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
};

export default EditTask;
