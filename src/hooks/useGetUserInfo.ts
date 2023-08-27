"use client";

const useGetUserInfo = () => {
  const data = localStorage.getItem("userData");
  let userData: string | null = data ? JSON.parse(data) : null;
  console.log(userData, "userData");
  return userData;
};

export default useGetUserInfo;
