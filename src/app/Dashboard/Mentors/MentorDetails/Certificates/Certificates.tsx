import React, { useState } from "react";
import cx from "classnames";
import styles from "./Certificates.module.scss";

import Button from "@/components/Button/Button";
import SuccessNotificationModal from "@/components/Modals/SuccessNotification/SuccessNotification";

import { ReactComponent as TogglerIconDown } from "@/assets/icons/arrow-circle-down.svg";
import { ReactComponent as TogglerIconUp } from "@/assets/icons/arrow-circle-up.svg";
import downloadSuccessImage from "@/assets/images/certificate-download-success.svg";
import certificate, { ReactComponent as CertificateIcon } from "@/assets/images/mentor-certificate.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { showModal } from "@/redux/Modal/ModalSlice";
const Certificates = () => {
  const dispatch = useAppDispatch();

  const displayModal = useAppSelector((state) => state.modal.show);
  const modalName = useAppSelector((state) => state.modal.modalName);

  const handleDownload = () => {
    dispatch(
      showModal({
        name: "successNotification",
        modalData: {
          title: "Certificate Downloaded Successfully!.",
          image: downloadSuccessImage
        }
      })
    );
  };

  const [toggle, setToggle] = useState({
    index: null,
    toggle: false
  });

  const cardData = [
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    },
    {
      title: "GADS CLOUD 2022 - COMPLETION",
      icon: CertificateIcon
    }
  ];

  const handleToggle = (index) => {
    if (toggle.index === index) {
      setToggle({
        index,
        toggle: !toggle.toggle
      });
    } else {
      setToggle({
        index,
        toggle: true
      });
    }
  };

  return (
    <div className={cx(styles.mentorCertificatesContainer, "flexCol")}>
      <div className={cx(styles.body, "flexCol")}>
        <div className={cx(styles.cardContainer, "flexCol")}>
          {cardData.map((item, index) => {
            return (
              <div className={cx(styles.cardWrapper, "flexCol")} key={index}>
                <div className={cx(styles.cardHeader, "flexRow-space-between")}>
                  <div className={cx(styles.cardIcon)}>
                    <item.icon />
                  </div>
                  <div className={cx(styles.metaData, "flexCol")}>
                    <h6 className={cx(styles.metaDataTitle)}>{item.title}</h6>
                  </div>
                  <div className={cx(styles.cardToggler)}>
                    {toggle?.toggle && toggle.index === index ? (
                      <TogglerIconUp onClick={() => handleToggle(index)} />
                    ) : (
                      <TogglerIconDown onClick={() => handleToggle(index)} />
                    )}
                  </div>
                </div>

                {toggle.index === index && toggle.toggle && (
                  <>
                    <div className={cx(styles.cardBody, "flexCol")}>
                      <div className={cx(styles.certificateDiv, "flexRow-fully-centered")}>
                        <Image src={certificate} alt='certificate' />
                      </div>

                      <div className={cx(styles.summaryDiv, "flexRow-align-center")}>
                        <span>Download as</span>
                        <select name='downloadOptions' id='downloadOptions'>
                          <option value='pdf'>PDF</option>
                          <option value='png'>PNG</option>
                          <option value='jpg'>JPG</option>
                        </select>

                        <Button onClick={() => handleDownload()} title='Download' />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {displayModal && modalName === "successNotification" ? <SuccessNotificationModal show size='md' /> : null}
    </div>
  );
};

export default Certificates;
