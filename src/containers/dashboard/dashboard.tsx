// ** service
import { useDashboardAnnouncementsReq, useDashboardHeaderReq } from "@/api/requests/dashboard";

// ** hooks
import { useResponsive } from "@/hooks";
import { useOidc } from "@/oidc/oidc";

// ** components
import { Flex } from "nordom-ui";
import DashboardHeader from "./components/dashboardHeader";
import DashboardPortfolio from "./components/dashboardPortfolio";
import DashboardAssets from "./components/dashboardAssets";
import DashboardAnnouncements from "@/components/dashboard/components/announcements/dashboardAnnouncementsUI";

const DashboardContainer = () => {
  const {
    oidcTokens: { accessToken },
  } = useOidc({ assertUserLoggedIn: true });

  const { data: header } = useDashboardHeaderReq(accessToken);
  const { data: announcements } = useDashboardAnnouncementsReq();

  const layoutGap = useResponsive({ desktop: 64, laptop: 56, tablet: 48, mobile: 40 });

  return (
    <Flex direction="column" justify="center" gap={layoutGap}>
      <DashboardHeader data={header} />
      <DashboardPortfolio data={header} />
      <DashboardAssets token={accessToken} />
      <DashboardAnnouncements announcementsData={announcements?.data} />
    </Flex>
  );
};

export default DashboardContainer;
