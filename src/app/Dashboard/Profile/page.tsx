"use client";

import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import cx from "classnames";
import countriesAndFlags from "@/utils/countriesAndFlags";

import styles from "./Profile.module.scss";
import ProfileDetail from "./ProfileDetail/ProfileDetail";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

import Loader from "@/components/Loader/Loader";

import githubIcon from "@/assets/icons/github-icon.svg";
import instagramIcon from "@/assets/icons/instagram-icon.svg";
import linkedinIcon from "@/assets/icons/linkedin-icon.svg";
import twitterIcon from "@/assets/icons/twitter-icon.svg";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfile } from "@/redux/Profile/ProfileSlice";

import arrayToString from "@/helpers/arrayToString";
import formatDate from "@/helpers/formatDate";

function Profile() {
  const dispatch = useAppDispatch();

  const [profileHeaderData, setProfileHeaderData] = useState({});
  const [profileDetailData, setProfileDetailData] = useState({});

  const userProfile = useAppSelector((state) => state.profile.getProfileData);
  const getProfileLoading = useAppSelector((state) => state.loading.getProfileLoading);

  useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      setProfileHeaderData({
        fullName: `${userProfile.firstName} ${userProfile.lastName}`,
        role: Array.isArray(userProfile?.roles) ? arrayToString(userProfile?.roles) : userProfile?.roles,
        profilePicture: userProfile.profilePicture,
        flagUrl: countriesAndFlags.find((item) => item.name === userProfile?.country)?.flag
      });
      setProfileDetailData({
        addressInfoData: [
          {
            id: 1,
            title: "Location:",
            info: `${userProfile.city}, ${userProfile.country}`
          },
          {
            id: 2,
            title: "Email:",
            info: userProfile?.email
          },
          {
            id: 3,
            title: "Website:",
            info: userProfile.website
          },
          {
            id: 4,
            title: "Member Since:",
            info: formatDate(userProfile.dateCreated)
          }
        ],
        socialInfoData: [
          {
            id: 1,
            title: "Instagram",
            icon: instagramIcon,
            username: userProfile.instagram
          },
          {
            id: 2,
            title: "Twitter",
            icon: twitterIcon,
            username: userProfile.twitter
          },
          {
            id: 3,
            title: "Github",
            icon: githubIcon,
            username: userProfile.github
          },
          {
            id: 4,
            title: "LinkedIn",
            icon: linkedinIcon,
            username: userProfile.linkedIn
          }
        ],
        bio: userProfile.bio
      });
    }
  }, [userProfile]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Container className={cx(styles.profileContainer)}>
      {getProfileLoading ? (
        <Loader />
      ) : (
        <>
          <Row className='mb-5'>
            <ProfileHeader data={profileHeaderData} />
          </Row>
          <Row>
            <ProfileDetail data={profileDetailData} />
          </Row>
        </>
      )}
    </Container>
  );
}

export default Profile;
