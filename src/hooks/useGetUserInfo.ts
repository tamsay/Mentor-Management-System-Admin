"use client";

const useGetUserInfo = () => {
  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData, "userData");
  return userData;
};

export default useGetUserInfo;
