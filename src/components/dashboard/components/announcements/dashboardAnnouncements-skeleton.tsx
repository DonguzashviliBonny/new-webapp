import { useResponsive } from "@/hooks";
import { calculateLastRowAndColumn } from "@/utils";
import { CardPaddingsT, Flex, ContainerLayout, Card, Skeleton } from "nordom-ui";

import classes from "./dashboardAnnouncements.module.scss";

const DashboardAnnouncementsSkeleton = () => {
  const cardPaddingSecondary: CardPaddingsT = useResponsive({ mobile: "16", tablet: "24", desktop: "32" });
  const numOfColumns = useResponsive({ mobile: 1, desktop: 3 });

  return (
    <Flex direction="column" className={classes.announcementsContainer}>
      <ContainerLayout borders border_left border_right>
        <Card bg_color="nord950" paddingInline={cardPaddingSecondary} paddingBlock="32">
          <Skeleton borderRadius={4} perItem={1} height={32} width={162} />
        </Card>
      </ContainerLayout>
      <ContainerLayout border_left border_right border_bottom>
        <section className={classes.cardsWrapper}>
          {Array.from({ length: 3 }).map((_, index) => {
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
                  <Flex justify="space-between" align="center" gap={24}>
                    <Skeleton borderRadius={4} height={28} width={162} perItem={1} />
                    <Skeleton borderRadius={4} height={20} width={78} perItem={1} />
                  </Flex>

                  <Skeleton borderRadius={4} height={24} width={279} perItem={1} />

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
