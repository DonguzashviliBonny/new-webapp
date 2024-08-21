// ** types

// ** components
import DashboardHeaderUI from "@/components/dashboard/components/header/DashboardHeaderUI";

// ** types
import { DashboardHeaderContainerProps, DashboardHeaderUIProps } from "@/types/components/dashboard/dashboardProps";

// ** hooks
import { useState } from "react";

const DashboardHeader: React.FC<DashboardHeaderContainerProps> = ({ data }) => {
  const cryptoAsset = "BTC";
  const [hideEstBalance, setHideEstBalance] = useState<boolean>(false);

  const dashboardHeaderUiProps: DashboardHeaderUIProps = {
    cryptoAsset,
    handleHide: () => setHideEstBalance((prev) => !prev),
    hide: hideEstBalance,
    userDetails: {
      avatarUri: data ? data.data.avatarUri : "",
      publicId: data ? data.data.publicId : null,
      userName: data ? data.data.userName : "",
    },
    estBalance: data && data.data.portfolioDetails.totalBalance,
  };

  return <DashboardHeaderUI {...dashboardHeaderUiProps} />;
};

export default DashboardHeader;
