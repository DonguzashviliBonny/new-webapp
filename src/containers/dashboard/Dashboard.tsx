// ** service
import { useDashboardAnnouncementsReq, useDashboardHeaderReq } from "@/api/requests/dashboard";

// ** hooks
import { useResponsive } from "@/hooks";
import { useOidc } from "@/oidc/oidc";

// ** components
import { Flex } from "nordom-ui";
import DashboardHeader from "./components/DashboardHeader";
import DashboardPortfolio from "./components/DashboardPortfolio";
import DashboardAssets from "./components/DashboardTable";
import DashboardAnnouncements from "@/components/dashboard/components/announcements/DashboardAnnouncementsUI";

const DashboardContainer = () => {
  const {
    oidcTokens: { accessToken },
  } = useOidc({ assertUserLoggedIn: true });

  const { data: header } = useDashboardHeaderReq(accessToken);
  const { data: announcements } = useDashboardAnnouncementsReq();

  const layoutGap = useResponsive({ desktop: 64, laptop: 56, tablet: 48, mobile: 40 });
  console.log(header);

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
