import { useTablet, useResponsive } from "@/hooks";
import { ContainerLayout, Flex, Skeleton } from "nordom-ui";

import classes from "./dashboardHeaderUI.module.scss";

const DashboardHeaderSkeleton = () => {
  const isTablet = useTablet();
  const navigationItemsSize = useResponsive({ laptop: 60, mobile: 40 });
  const userNameWidth = useResponsive({ laptop: 249, tablet: 220, mobile: 200 });
  const balanceWidth = useResponsive({ laptop: 327, tablet: 300, mobile: 250 });

  return (
    <ContainerLayout bg_color="nord950" border_bottom padding={{ block: 24 }}>
      <Flex
        align={isTablet ? "center" : "flex-start"}
        direction={isTablet ? "row" : "column"}
        gap={isTablet ? 0 : 32}
        justify="space-between"
        className={classes.content}
      >
        <Flex gap={12}>
          <div className={classes.profileImg}>
            <Skeleton bg_color="nord850" perItem={1} width={96} height={96} borderRadius={10} />
          </div>

          <Flex direction="column" gap={10} style={{ marginTop: 6 }}>
            <Flex direction="column" gap={8}>
              <Skeleton perItem={1} width={userNameWidth} height={18} borderRadius={4} />

              <Skeleton perItem={1} width={102} height={24} borderRadius={4} />
            </Flex>

            <Skeleton perItem={1} width={balanceWidth} height={24} borderRadius={4} />
          </Flex>
        </Flex>

        <Flex
          justify={isTablet ? undefined : "center"}
          align="center"
          gap={32}
          style={{ width: isTablet ? "auto" : "100%" }}
        >
          <Skeleton
            perItem={4}
            width={navigationItemsSize}
            height={navigationItemsSize}
            borderRadius={10}
            bg_color="nord850"
          />
        </Flex>
      </Flex>
    </ContainerLayout>
  );
};

export default DashboardHeaderSkeleton;
