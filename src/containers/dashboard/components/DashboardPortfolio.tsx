// ** components
import DashboardPortfolioUI from "@/components/dashboard/components/portfolio/DashboardPortfolioUI";

// ** types
import {
  DashboardPortfolioContainerProps,
  DashboardPortfolioUIProps,
  PieChartI,
  PortfolioChartI,
} from "@/types/components/dashboard/dashboardProps";

// ** hooks
import { useState } from "react";

const DashboardPortfolio: React.FC<DashboardPortfolioContainerProps> = ({ data }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const sortPieChartData = (data?: PieChartI) => {
    const filteredPieCHartData =
      data?.top.map((e) => ({
        ...e,
      })) || [];
    if (data && data.other.balance > 0)
      filteredPieCHartData.push({
        asset: "Others",
        balance: data.other.balance,
        percentage: data.other.percentage,
      });

    return filteredPieCHartData;
  };

  const sortLineChartData = (data?: PortfolioChartI[]) => {
    return data?.map((entry) => ({
      time: entry.date.split("T")[0],
      value: entry.balance,
    }));
  };

  const dashboardPortfolioUIProps: DashboardPortfolioUIProps = {
    handleMouseOver: (_, id) => setHovered(id),
    hovered,
    setHovered,
    lineChartData: sortLineChartData(data?.data.portfolioDetails.portfolioChart),
    pieChartData: sortPieChartData(data?.data.portfolioDetails.pieChart),
  };

  return <DashboardPortfolioUI {...dashboardPortfolioUIProps} />;
};

export default DashboardPortfolio;
