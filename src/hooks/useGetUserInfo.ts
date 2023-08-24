"use client";

const useGetUserInfo = () => {
  let userData: string | null = JSON.parse(localStorage.getItem("userData"));
  console.log(userData, "userData");
  return userData;
};

export default useGetUserInfo;
