import React from "react";
import classes from "./DonutChart.module.scss";

// ** dummy Data
import components from "@/assets/data/components.json";

// ** components
import { PieChart } from "react-minimal-pie-chart";
import { TextView, Flex, Card, DirectionT } from "nordom-ui";

// ** hooks
import { useMobile, useResponsive } from "@/hooks";
import { formatAmountToString, formatLargeNumber } from "@/utils";
import { DonutChartProps } from "@/types/components/dashboard";

const DonutChart: React.FC<DonutChartProps> = ({ data, hovered, handleMouseOver, setHovered }) => {
  const mobile = useMobile();
  const PieChartLayoutGap = useResponsive({ desktop: 44, laptop: 34, tablet: 58, mobile: 21 });
  const PieChartLayoutDirection: DirectionT = useResponsive({ tablet: "row", mobile: "column" });

  const { colors } = components;
  const mappedData =
    data &&
    data.map((item, index) => ({
      title: item.asset,
      value: item.balance,
      color: colors.pieChartColors[index],
    }));

  const getHoveredValue = () => {
    if (hovered !== null && mappedData && mappedData[hovered]) {
      return formatLargeNumber(mappedData[hovered].value);
    }
    return null;
  };

  return (
    <Card
      paddingInline={mobile ? "16" : "24"}
      paddingBlock={"24"}
      className={classes.pieChartSect}
      role="donut-chart"
      bg_color="nord900"
      style={{ height: "100%" }}
    >
      <div className={classes.pieChartContent}>
        <TextView size={16}>Portfolio Pie Chart</TextView>

        <Flex
          direction={PieChartLayoutDirection}
          align="center"
          className={classes.pieChartContentWrapper}
          gap={PieChartLayoutGap}
        >
          <div className={classes.pieChart}>
            {mappedData && (
              <PieChart
                data={mappedData}
                lineWidth={32}
                className={classes.donutChart}
                animate={true}
                animationDuration={500}
                onMouseOver={handleMouseOver}
                segmentsStyle={(e) => {
                  return hovered === e ? { strokeWidth: 20 } : {};
                }}
                onMouseOut={() => setHovered(null)}
              />
            )}

            <TextView size={20} weight="700" className={classes.assetValuePieChart}>
              {hovered !== null ? `$${getHoveredValue()}` : ""}
            </TextView>
          </div>

          <Flex direction="column" gap={8} className={classes.dataText}>
            {data &&
              data.map((e, i) => (
                <Flex justify="space-between" align="center" key={i}>
                  <Flex align="center" gap={10}>
                    <div className={classes.dot} style={{ background: colors.pieChartColors[i] }}></div>

                    {e.asset === "Others" ? (
                      <TextView size={14} weight="400" underline={true}>
                        Other Coins
                      </TextView>
                    ) : (
                      <TextView size={14} weight="400">
                        {e.asset}
                      </TextView>
                    )}
                  </Flex>

                  <TextView size={14} weight="400" color="nord400">
                    ${formatAmountToString(e.balance.toString(), 2)}
                  </TextView>
                </Flex>
              ))}
          </Flex>
        </Flex>
      </div>
    </Card>
  );
};

export default DonutChart;
