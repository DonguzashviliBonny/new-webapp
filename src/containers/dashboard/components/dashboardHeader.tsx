import { DashboardHeaderDetailsResT } from "@/api/types/dashboard";
import DashboardHeaderUI from "@/components/dashboard/components/header/dashboardHeaderUI";
import { DashboardHeaderProps } from "@/types/components/dashboard";
import { useState } from "react";

const DashboardHeader = ({ data }: DashboardHeaderDetailsResT) => {
  const cryptoAsset = "BTC";
  const [hideEstBalance, setHideEstBalance] = useState<boolean>(false);

  const dashboardHeaderUiProps: DashboardHeaderProps = {
    cryptoAsset,
    handleHide: () => setHideEstBalance((prev) => !prev),
    hide: hideEstBalance,
    userDetails: {
      avatarUri: data ? data.avatarUri : "",
      publicId: data ? data.publicId : null,
      userName: data ? data.userName : "",
    },
    estBalance: data?.portfolioDetails.totalBalance,
  };

  return <DashboardHeaderUI {...dashboardHeaderUiProps} />;
};

export default DashboardHeader;
