// ** hooks
import { useResponsive } from "@/hooks";

// ** helpers
import { calculateLastRowAndColumn } from "@/utils";

// ** componnets
import { CardPaddingsT, Flex, ContainerLayout, Card, Skeleton } from "nordom-ui";

// ** style
import classes from "./dashboardAnnouncements.module.scss";

/**
 * Component that renders a skeleton UI for the dashboard announcements section.
 * This component is used to display a placeholder UI while the actual announcements data is being fetched.
 */
const DashboardAnnouncementsSkeleton = () => {
  // Get the card padding based on the screen size
  const cardPaddingSecondary: CardPaddingsT = useResponsive({ mobile: "16", tablet: "24", desktop: "32" });
  // Get the number of columns based on the screen size
  const numOfColumns = useResponsive({ mobile: 1, desktop: 3 });

  return (
    // Main container for the announcements section
    <Flex direction="column" className={classes.announcementsContainer}>
      {/* Container for the title card */}
      <ContainerLayout borders border_left border_right>
        <Card bg_color="nord950" paddingInline={cardPaddingSecondary} paddingBlock="32">
          {/* Skeleton for the title */}
          <Skeleton borderRadius={4} perItem={1} height={32} width={162} />
        </Card>
      </ContainerLayout>

      {/* Container for the announcement cards */}
      <ContainerLayout border_left border_right border_bottom>
        <section className={classes.cardsWrapper}>
          {/* Render the announcement cards */}
          {Array.from({ length: 3 }).map((_, index) => {
            // Get the information about the current row and column
            const { isLastRow, isLastInColumn } = calculateLastRowAndColumn(index, 3, numOfColumns);

            return (
              <Card
                padding={cardPaddingSecondary}
                bg_color="nord900"
                border_bottom={!isLastRow ? "nord800" : "transparent"}
                border_right={isLastInColumn ? "nord800" : "transparent"}
                key={index}
              >
                <Flex direction="column" gap={8}>
                  {/* Container for the title and date */}
                  <Flex justify="space-between" align="center" gap={24}>
                    {/* Skeleton for the title */}
                    <Skeleton borderRadius={4} height={28} width={162} perItem={1} />
                    {/* Skeleton for the date */}
                    <Skeleton borderRadius={4} height={20} width={78} perItem={1} />
                  </Flex>

                  {/* Skeleton for the short description */}
                  <Skeleton borderRadius={4} height={24} width={279} perItem={1} />

                  {/* Skeleton for the image */}
                  <Skeleton borderRadius={4} height={110} perItem={1} />
                </Flex>
              </Card>
            );
          })}
        </section>
      </ContainerLayout>
    </Flex>
  );
};

export default DashboardAnnouncementsSkeleton;
