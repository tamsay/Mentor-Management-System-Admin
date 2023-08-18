import React from "react";

import DashboardContainer from "@/components/DashboardContainer/DashboardContainer";

const layout: React.FC = ({ children }) => {
  return <DashboardContainer>{children}</DashboardContainer>;
};

export default layout;
