import React from "react";
import { Controller, useForm } from "react-hook-form";
import cx from "classnames";
import PropTypes from "prop-types";
import ModalContainer from "../ModalContainer/ModalContainer";
import styles from "./CreateAndEditForumTopic.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "@/components/Button/Button";
import InputField from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";

import attachmentIcon from "@/assets/icons/attachment-icon-green.svg";
import closeIcon from "@/assets/icons/close-icon.svg";
import smileyIcon from "@/assets/icons/smiley-icon.svg";
import successImage from "@/assets/images/default-success-notification-image.png";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { hideModal, showModal } from "@/redux/Modal/ModalSlice";

import { createAndEditForumTopicSchema } from "@/helpers/validation";

function CreateAndEditForumTopic({ show, size, modalName }) {
  const dispatch = useAppDispatch();
  const modalData = useAppSelector((state) => state.modal.modalData);

  const handleCloseModal = () => {
    dispatch(hideModal({ name: "successNotification" }));
  };

  const resolver = yupResolver(createAndEditForumTopicSchema);

  const defaultValues = {
    title: modalData?.data?.title || "",
    body: modalData?.data?.description || ""
  };

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ defaultValues, resolver, mode: "all" });

  const createPost = (data) => {
    console.log(data);

    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: modalData?.type === "create" ? "Post Created Successfully" : "Post Updated Successfully",
          image: successImage
        }
      })
    );
  };

  return (
    <ModalContainer show={show} size={size} modalName={modalName}>
      <div className={cx(styles.modalWrapper, "flexCol")}>
        <div className={cx(styles.modalHeader, "flexRow-space-between")}>
          <h6 className={cx(styles.headerTitle)}>{modalData?.title}</h6>
          <Image onClick={() => handleCloseModal()} src={closeIcon} alt='close-icon' />
        </div>

        <div className={cx(styles.modalBody, "flexCol")}>
          <div className={cx(styles.formWrapper, "flexCol")}>
            <form onSubmit={handleSubmit((data) => createPost(data))}>
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

              <div className={cx(styles.textAreaWrapper, "flexCol")}>
                <Controller
                  name='body'
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      placeholder='Start typing...'
                      borderColor='none'
                      marginbottom='0'
                      minHeight='150px'
                      error={errors?.body && errors?.body?.message}
                    />
                  )}
                />

                <div className={cx(styles.attachmentsDiv, "flexRow-align-center")}>
                  <Image src={attachmentIcon} alt='attachment-icon' />
                  <Image src={smileyIcon} alt='smiley-icon' />
                </div>
              </div>

              <div className={cx(styles.submitBtnDiv, "flexRow-right-centered")}>
                {modalData?.type === "create" ? (
                  <Button
                    onClick={handleSubmit((data) => createPost(data))}
                    // loading={loading}
                    // disabled={loading}
                    title='Post to forum'
                    btnType='primary'
                  />
                ) : (
                  <Button
                    onClick={handleSubmit((data) => createPost(data))}
                    // loading={loading}
                    // disabled={loading}
                    title='Save changes'
                    btnType='primary'
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}

CreateAndEditForumTopic.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.string,
  modalName: PropTypes.string
};

export default CreateAndEditForumTopic;
