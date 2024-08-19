// ** hooks
import { useMobile, useTablet, useLaptop, useResponsive } from "@/hooks";

// ** components
import { DirectionT, CardPaddingsT, Flex, ContainerLayout, Skeleton, Card } from "nordom-ui";

// ** style
import classes from "./dashboardPortfolioUI.module.scss";

const DashboardPortfolioSkeleton = () => {
  const isMobile = useMobile();
  const isTablet = useTablet();
  const isLaptop = useLaptop();

  const chartsLayout: DirectionT = useResponsive({ laptop: "row", mobile: "column" });
  const chartLayoutInlinePadding: CardPaddingsT = useResponsive({ desktop: "32", tablet: "24", mobile: "16" });
  const PieChartLayoutGap = useResponsive({ desktop: 44, laptop: 34, tablet: 58, mobile: 21 });
  const PieChartLayoutDirection: DirectionT = useResponsive({ tablet: "row", mobile: "column" });
  const lineChartWidth = useResponsive({ desktop: 685, mobile: undefined });
  const pieChartWidth = useResponsive({ desktop: 223, laptop: 210, tablet: 223, mobile: 223 });
  const pieChartItemsWidth = useResponsive({ desktop: 201, laptop: 180, tablet: 180, mobile: 180 });

  return (
    <Flex direction="column">
      <ContainerLayout padding={{ block: 32, left: 32 }} child_bg_color="nord950" border_right border_left border_top>
        <Skeleton perItem={1} width={200} height={24} borderRadius={4} />
      </ContainerLayout>

      <ContainerLayout borders style={{ height: isLaptop ? "337px" : "auto" }}>
        <Flex direction={chartsLayout} style={{ height: "100%" }}>
          <div style={{ flex: isLaptop ? "0 1 720px" : "1 1 auto" }}>
            <Card
              paddingBlock="24"
              paddingInline={chartLayoutInlinePadding}
              className={classes.portfolioChart}
              role="line-chart"
              bg_color="nord900"
              style={{ height: "100%" }}
            >
              <Flex direction="column" gap={20} style={{ height: "100%" }}>
                <Skeleton
                  perItem={1}
                  width={isTablet ? 214 : undefined}
                  height={24}
                  borderRadius={4}
                  bg_color="nord800"
                />

                <Skeleton perItem={1} width={lineChartWidth} height={206} borderRadius={4} bg_color="nord800" />
              </Flex>
            </Card>
          </div>

          <div style={{ flex: "1 1 auto", borderLeft: "1px solid rgb(47, 47, 47)" }}>
            <Card
              paddingInline={isMobile ? "16" : "24"}
              paddingBlock={"24"}
              className={classes.pieChartSect}
              role="donut-chart"
              bg_color="nord900"
              style={{ height: "100%" }}
            >
              <Flex direction="column" gap={20} className={classes.pieChartContent}>
                <Skeleton
                  perItem={1}
                  width={isTablet ? 160 : undefined}
                  height={24}
                  borderRadius={4}
                  bg_color="nord800"
                />

                <Flex
                  direction={PieChartLayoutDirection}
                  align="center"
                  className={classes.pieChartContentWrapper}
                  gap={PieChartLayoutGap}
                >
                  <div className={classes.pieChart}>
                    <Skeleton perItem={1} width={pieChartWidth} height={206} borderRadius={4} bg_color="nord800" />
                  </div>

                  <Flex direction="column" gap={20} className={classes.dataText}>
                    <Skeleton perItem={5} width={pieChartItemsWidth} borderRadius={4} />
                  </Flex>
                </Flex>
              </Flex>
            </Card>
          </div>
        </Flex>
      </ContainerLayout>
    </Flex>
  );
};

export default DashboardPortfolioSkeleton;
