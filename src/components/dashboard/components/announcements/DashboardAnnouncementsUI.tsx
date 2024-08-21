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

/**
 * A component that renders a list of announcements.
 *
 * @param announcementsData The announcements data to be rendered.
 * @returns A JSX element that displays the announcements.
 */
const DashboardAnnouncements: React.FC<DashboardAnnouncementsProps> = ({ announcementsData }) => {
  /**
   * Whether the screen is in mobile mode.
   */
  const isMobile = useMobile();

  /**
   * Whether the screen is in desktop mode.
   */
  const isDesktop = useDesktop();

  /**
   * The number of columns to render the announcements in.
   * This is determined by the screen size.
   */
  const numOfColumns = useResponsive({ mobile: 1, tablet: 2, desktop: 3 });

  /**
   * If the announcements data is not available, render a skeleton.
   */
  if (!announcementsData) return <DashboardAnnouncementsSkeleton />;

  /**
   * If the screen is in tablet mode, only render the first two announcements.
   */
  const tabletData = announcementsData.slice(0, 2);

  /**
   * The main container for the announcements.
   */
  return (
    <Flex direction="column" className={classes.announcementsContainer}>
      /** * The title and "View All" button. */
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
          {
            /**
             * If the screen is in desktop mode, render all the announcements.
             * Otherwise, only render the first two announcements.
             */
            isDesktop
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
                })
          }
        </section>
      </ContainerLayout>
    </Flex>
  );
};

export default DashboardAnnouncements;
