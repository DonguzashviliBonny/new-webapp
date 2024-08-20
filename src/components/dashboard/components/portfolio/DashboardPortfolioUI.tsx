import React from "react";

// ** components
import { TextView, Flex, ContainerLayout, DirectionT } from "nordom-ui";
import DonutChart from "@/components/reusables/charts/DonutChart/DonutChart";
import LineChart from "@/components/reusables/charts/LineChart/LineChart";

// ** hooks
import { useLaptop, useMobile, useResponsive } from "@/hooks";
import DashboardPortfolioUISkeleton from "./DashboardPortfolioUI-skeleton";
import { DashboardPortfolioProps } from "@/types/components/dashboard/dashboardProps";

// ** types

const DashboardPortfolioUI: React.FC<DashboardPortfolioProps> = ({
  hovered,
  setHovered,
  lineChartData,
  pieChartData,
  handleMouseOver,
}) => {
  const chartsLayout: DirectionT = useResponsive({ laptop: "row", mobile: "column" });
  const isLaptop = useLaptop();
  const isMobile = useMobile();

  if (!lineChartData || !pieChartData) return <DashboardPortfolioUISkeleton />;

  return (
    <Flex direction="column">
      <ContainerLayout padding={{ block: 32, left: 32 }} child_bg_color="nord950" border_right border_left border_top>
        <TextView size={isMobile ? 20 : 24} weight="700" upperCase>
          My Portfolio
        </TextView>
      </ContainerLayout>

      <ContainerLayout borders style={{ height: isLaptop ? "337px" : "auto" }}>
        <Flex direction={chartsLayout} style={{ height: "100%" }}>
          <div style={{ flex: isLaptop ? "0 1 720px" : "1 1 auto" }}>
            {lineChartData?.length > 0 && <LineChart data={lineChartData} bgColor="900" />}
          </div>

          <div style={{ flex: "1 1 auto", borderLeft: isLaptop ? "1px solid rgb(47, 47, 47)" : "none" }}>
            <DonutChart
              data={pieChartData}
              hovered={hovered}
              setHovered={setHovered}
              handleMouseOver={handleMouseOver}
            />
          </div>
        </Flex>
      </ContainerLayout>
    </Flex>
  );
};

export default DashboardPortfolioUI;
