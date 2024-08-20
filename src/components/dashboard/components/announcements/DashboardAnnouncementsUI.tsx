import React from "react";

// ** style
import classes from "./dashboardAnnouncements.module.scss";

// ** types

// ** icons
import { ArrowRightIcon } from "@/assets/svg/arrows";

// ** components
import { TextView, Flex, ContainerLayout } from "nordom-ui";
import AnnouncementsCard from "../../../reusables/cards/announcements/AnnouncementsCard";

// ** hooks
import { useDesktop, useMobile, useResponsive } from "@/hooks";

// ** helpers
import { calculateLastRowAndColumn } from "@/utils";
import DashboardAnnouncementsSkeleton from "./DashboardAnnouncements-skeleton";
import { DashboardAnnouncementsProps } from "@/types/components/dashboard/dashboardProps";

const landing = import.meta.env.VITE_BASE_LANDING_APP_URL;

const DashboardAnnouncements: React.FC<DashboardAnnouncementsProps> = ({ announcementsData }) => {
  const isMobile = useMobile();
  const isDesktop = useDesktop();
  const numOfColumns = useResponsive({ mobile: 1, tablet: 2, desktop: 3 });

  if (!announcementsData) return <DashboardAnnouncementsSkeleton />;

  const tabletData = announcementsData.slice(0, 2);

  return (
    <Flex direction="column" className={classes.announcementsContainer}>
      <ContainerLayout borders padding={32} child_bg_color="nord950">
        <Flex justify="space-between" align="center">
          <TextView size={isMobile ? 20 : 24} weight="700" upperCase>
            Announcements
          </TextView>

          <a href={`${landing}/announcements`}>
            <Flex align="center" gap={4}>
              <TextView size={14}>View All</TextView>
              <ArrowRightIcon />
            </Flex>
          </a>
        </Flex>
      </ContainerLayout>

      <ContainerLayout border_left border_right border_bottom>
        <section className={classes.cardsWrapper}>
          {isDesktop
            ? announcementsData.map((item, i) => {
                const { isLastRow, isLastInColumn } = calculateLastRowAndColumn(
                  i,
                  announcementsData.length,
                  numOfColumns
                );

                return (
                  <AnnouncementsCard
                    key={i}
                    data={item.attributes}
                    border_bottom={!isLastRow ? "nord800" : "transparent"}
                    border_right={isLastInColumn ? "nord800" : "transparent"}
                    link={item.id}
                  />
                );
              })
            : tabletData.map((item, i) => {
                const { isLastRow, isLastInColumn } = calculateLastRowAndColumn(i, tabletData.length, numOfColumns);

                return (
                  <AnnouncementsCard
                    key={i}
                    data={item.attributes}
                    border_bottom={isMobile || !isLastRow ? "nord800" : "transparent"}
                    border_right={isLastInColumn ? "nord800" : "transparent"}
                    link={item.id}
                  />
                );
              })}
        </section>
      </ContainerLayout>
    </Flex>
  );
};

export default DashboardAnnouncements;
