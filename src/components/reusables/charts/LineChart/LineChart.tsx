import classes from "./LineChart.module.scss";
// ** components
import { Flex, Card, TextView, CardPaddingsT } from "nordom-ui";

// ** 3rd party
import { createChart, ColorType, ISeriesApi, MouseEventParams, LineData, Time } from "lightweight-charts";

// ** hooks
import React, { RefObject, useEffect, useRef } from "react";
import { useResponsive, useTablet } from "@/hooks";

// ** utils
import { getCSSVarValue } from "@/utils";
import { LineChartProps } from "@/types/components/dashboard";

const LineChart: React.FC<LineChartProps> = ({ data, bgColor }) => {
  const tablet = useTablet();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartHeight = useResponsive({ laptop: 245, tablet: 222, mobile: 245 });
  const chartLayoutInlinePadding: CardPaddingsT = useResponsive({ desktop: "32", tablet: "24", mobile: "16" });

  useEffect(() => {
    const colorVariables = {
      backgroundColor: getCSSVarValue(bgColor || "950"),
      textColor: getCSSVarValue("300"),
      lineColor: getCSSVarValue("orange"),
      areaBottomColor: getCSSVarValue("orange-10"),
      areaTopColor: getCSSVarValue("orange-10"),
      gridColor: getCSSVarValue("800"),
    };

    const chartCustomRef = chartContainerRef.current;
    if (!chartCustomRef) return;

    const handleResize = () => {
      chart.applyOptions({
        width: chartCustomRef ? chartCustomRef.clientWidth : 0,
      });
    };

    chartCustomRef.style.backgroundColor = "#161616";

    const chart = createChart(chartCustomRef, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: colorVariables.backgroundColor,
        },
        textColor: colorVariables.textColor,
      },

      width: chartCustomRef.clientWidth, // this line is shrinking the chart from left to right
      height: chartHeight,

      crosshair: {
        mode: 1,
        horzLine: {
          visible: false,
          labelVisible: false,
        },
        vertLine: {
          visible: true,
          labelVisible: false,
        },
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0)", // Set color to transparent to hide vertical lines
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0)", // Set color to transparent to hide horizontal lines
        },
      },
      rightPriceScale: { visible: false },
      leftPriceScale: {
        visible: true,
        scaleMargins: {
          top: 0.35, // controls the diagram height inside the chart
          bottom: 0,
        },
        borderVisible: false,
      },
      handleScroll: false,
      handleScale: false,
      timeScale: {
        tickMarkFormatter: (time: Time) => {
          const date = new Date(time as string);
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          return `${month}/${day}`;
        },
      },
    });

    chart.timeScale().fitContent();
    const newSeries = chart.addAreaSeries({
      lineColor: colorVariables.lineColor,
      topColor: colorVariables.areaTopColor,
      bottomColor: "black",
      priceLineVisible: false,
      lastValueVisible: false, // removes the line which shows current price
      crosshairMarkerBorderColor: colorVariables.lineColor, // changes the border color of the marker
      crosshairMarkerBorderWidth: 0,
      priceFormat: {
        type: "custom",
        formatter: (price: number) => `${price.toFixed(2)} $`, // Add $ after each price
      },
    });

    chart.priceScale("right").applyOptions({
      borderVisible: false,
    });

    chart.priceScale("left").applyOptions({
      borderVisible: false,
      textColor: "#656565",
    });

    chart.timeScale().applyOptions({
      borderVisible: false,
      timeVisible: true,
      ticksVisible: true,
      tickMarkMaxCharacterLength: 2,
    });

    newSeries.setData(data);

    // Static marker at the last data point
    const lastDataPoint = data[data.length - 1];
    newSeries.setMarkers([
      {
        time: lastDataPoint.time,
        position: "inBar",
        color: colorVariables.lineColor,
        shape: "circle",
        size: 0.6,
      },
    ]);

    const tooltip = document.createElement("div");

    setupTooltipStyle(tooltip, chartContainerRef);

    initTooltipAtLastDataPoint(data, newSeries, tooltip);
    tooltip.style.display = "flex";

    let timeoutId: NodeJS.Timeout | null = null;

    // Update marker on hover with custom debounce
    const handleMove = (param: MouseEventParams) => {
      if (timeoutId) clearTimeout(timeoutId); // Clear existing timeout

      timeoutId = setTimeout(() => {
        if (param.point === undefined || param.time === undefined) {
          newSeries.setMarkers([
            {
              time: lastDataPoint.time,
              position: "inBar",
              color: colorVariables.lineColor,

              shape: "circle",
              size: 0.6,
            },
          ]);
          setTooltipToLastDataPoint(newSeries, tooltip);
        } else {
          newSeries.setMarkers([
            {
              time: param.time,
              position: "inBar",
              color: colorVariables.lineColor,
              shape: "circle",
              size: 0.6,
            },
          ]);
        }

        updateTooltipOnHover(param, newSeries, tooltip);
      }, 5);
    };

    chartCustomRef.addEventListener("mouseleave", () => {
      setTooltipToLastDataPoint(newSeries, tooltip);
      tooltip.style.display = "flex";
    });

    chart.subscribeCrosshairMove(handleMove);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartCustomRef) {
        chartCustomRef.removeEventListener("mouseleave", () => {
          setTooltipToLastDataPoint(newSeries, tooltip);
        });
      }
      chart.unsubscribeCrosshairMove(handleMove);
      chart.remove();
      if (chartContainerRef.current) {
        chartContainerRef.current.removeChild(tooltip); // Remove tooltip on cleanup
      }
    };
  }, [data, tablet]);

  const setupTooltipStyle = (tooltip: HTMLDivElement, chartContainerRef: RefObject<HTMLDivElement>) => {
    tooltip.style.position = "absolute";
    tooltip.style.display = "none";
    tooltip.style.padding = "8px";
    tooltip.style.boxSizing = "border-box";
    tooltip.style.textAlign = "left";
    tooltip.style.zIndex = "1";
    tooltip.style.top = "8px";
    tooltip.style.left = "12px";
    tooltip.style.pointerEvents = "none";
    tooltip.style.border = "1px solid";
    tooltip.style.borderRadius = "8px";
    tooltip.style.background = "#1D1D1D";
    tooltip.style.borderColor = "#2F2F2F";

    if (chartContainerRef.current) {
      chartContainerRef.current.appendChild(tooltip);
    }
  };

  const initTooltipAtLastDataPoint = (
    data: LineData<Time>[],
    newSeries: ISeriesApi<"Area">,
    tooltip: HTMLDivElement
  ) => {
    const lastDataPoint = data[data.length - 1];

    if (lastDataPoint) {
      const price = lastDataPoint.value;
      const coordinate = newSeries.priceToCoordinate(price);

      if (coordinate !== null) {
        tooltip.innerHTML = formatTooltipContent(price);
        tooltip.style.display = "flex";
        tooltip.style.flexDirection = "column";

        const chartRect = chartContainerRef.current!.getBoundingClientRect();
        const toolTipWidth = tooltip.clientWidth;
        const toolTipHeight = tooltip.clientHeight;

        const left = Math.max(0, Math.min(chartRect.width - toolTipWidth, chartRect.width - toolTipWidth - 20));

        // Calculate vertical position (top) based on the chart container
        const top = Math.max(0, Math.min(coordinate - toolTipHeight / 2, chartRect.height - toolTipHeight));

        tooltip.style.left = `${chartRect.left + left}px`;
        tooltip.style.top = `${chartRect.top + top}px`;
      }
    }
  };

  const updateTooltipOnHover = (param: MouseEventParams, newSeries: ISeriesApi<"Area">, tooltip: HTMLDivElement) => {
    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > chartContainerRef.current!.clientWidth ||
      param.point.y < 0 ||
      param.point.y > chartContainerRef.current!.clientHeight
    ) {
      setTooltipToLastDataPoint(newSeries, tooltip);
    } else {
      const priceData = param.seriesData.get(newSeries) as LineData<Time>;
      if (priceData) {
        tooltip.innerHTML = formatTooltipContent(priceData.value);
        const coordinate = newSeries.priceToCoordinate(priceData.value);

        if (coordinate !== null) {
          const toolTipWidth = tooltip.clientWidth;
          const toolTipHeight = tooltip.clientHeight;
          const toolTipMarginleft = window.innerWidth > 768 ? 200 : 100;
          const toolTipMarginTop = window.innerWidth > 768 ? 450 : 250;

          let left = param.point.x + toolTipMarginleft;
          if (left > chartContainerRef.current!.clientWidth - toolTipWidth) {
            left = param.point.x + toolTipMarginleft - toolTipWidth;
          }

          let top = param.point.y + toolTipMarginTop;
          if (top > chartContainerRef.current!.clientHeight - toolTipHeight) {
            top = param.point.y - toolTipHeight + toolTipMarginTop;
          }

          tooltip.style.left = left + "px";
          tooltip.style.top = top + "px";
          tooltip.style.display = "block";
        }
      }
    }
  };

  const setTooltipToLastDataPoint = (series: ISeriesApi<"Area">, tooltipDiv: HTMLDivElement): void => {
    const lastData = data[data.length - 1];
    const coordinate = series.priceToCoordinate(lastData.value);

    if (coordinate !== null) {
      tooltipDiv.innerHTML = formatTooltipContent(lastData.value);

      const chartRect = chartContainerRef.current!.getBoundingClientRect();
      const toolTipWidth = tooltipDiv.clientWidth;
      const toolTipHeight = tooltipDiv.clientHeight;

      // Calculate horizontal position (left)
      const left = Math.max(0, Math.min(chartRect.width - toolTipWidth, chartRect.width - toolTipWidth - 20));

      // Calculate vertical position (top) based on the chart container
      const top = Math.max(0, Math.min(coordinate - toolTipHeight - 15, chartRect.height - toolTipHeight));

      tooltipDiv.style.left = `${chartRect.left + left}px`;
      tooltipDiv.style.top = `${chartRect.top + top}px`;
      tooltipDiv.style.display = "block";
    } else {
      tooltipDiv.style.display = "none";
    }
  };

  const formatTooltipContent = (price: number): string => {
    return `<div style="display: flex; align-items: center;">
                <div class="tooltipElement"></div>
                <p style="margin-block: 0; margin-right: 4px" class="NDM_text NDM_text_400 NDM_text_12 NDM_text_nord400">Est. Balance:</p>
                <p style="margin: 0" class="NDM_text NDM_text_500 NDM_text_12 NDM_text_nord50"> 
                  $${price.toFixed(2)}
                </p>
            </div>`;
  };

  return (
    <Card
      paddingBlock="24"
      paddingInline={chartLayoutInlinePadding}
      className={classes.portfolioChart}
      role="line-chart"
      bg_color="nord900"
      style={{ height: "100%" }}
    >
      <Flex direction="column" gap={20} style={{ height: "100%" }}>
        <Flex gap={4} align="center">
          <TextView size={16}>Portfolio Chart</TextView>
          <TextView size={14} weight="400" color="nord400">
            (Last 7 days)
          </TextView>
        </Flex>

        <div style={{ height: "100%" }} ref={chartContainerRef} />
      </Flex>
    </Card>
  );
};

export default LineChart;
