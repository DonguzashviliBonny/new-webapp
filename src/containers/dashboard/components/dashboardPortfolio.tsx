import { DashboardHeaderDetailsResT } from "@/api/types/dashboard";
import DashboardPortfolioUI from "@/components/dashboard/components/portfolio/dashboardPortfolioUI";
import { DashboardPortfolioProps, PieChartI, PortfolioChartI } from "@/types/components/dashboard";
import { useState } from "react";

const DashboardPortfolio = ({ data }: DashboardHeaderDetailsResT) => {
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

  const dashboardPortfolioUIProps: DashboardPortfolioProps = {
    handleMouseOver: (_, id) => setHovered(id),
    hovered,
    setHovered,
    lineChartData: sortLineChartData(data?.portfolioDetails.portfolioChart),
    pieChartData: sortPieChartData(data?.portfolioDetails.pieChart),
  };

  return <DashboardPortfolioUI {...dashboardPortfolioUIProps} />;
};

export default DashboardPortfolio;
