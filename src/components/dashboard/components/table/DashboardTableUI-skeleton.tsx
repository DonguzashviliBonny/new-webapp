// ** hooks
import { useResponsive, useTablet } from "@/hooks";

// ** components
import { ContainerLayout, Flex, Skeleton } from "nordom-ui";

// ** style
import classes from "./dashboardAssetsUI.module.scss";

const DashboardAssetsUISkeleton = () => {
  const tablet = useTablet();

  const containerLayoutPaddingInline = useResponsive({ laptop: 32, tablet: 24, mobile: 16 });
  const tableLayoutPadding = useResponsive({ desktop: 32, tablet: 24, mobile: 16 });

  return (
    <div className={`${classes.container}`}>
      <ContainerLayout padding={{ left: 0, right: 0 }} borders>
        <Flex direction="column">
          <ContainerLayout
            className={classes.removeP}
            border_bottom
            bg_color="nord950"
            padding={{ top: 32, bottom: 32, inline: containerLayoutPaddingInline }}
          >
            <Flex
              justify="space-between"
              align={tablet ? "center" : "flex-start"}
              direction={tablet ? "row" : "column"}
              gap={16}
              style={{ width: "100%" }}
            >
              <Skeleton perItem={1} width={tablet ? 214 : undefined} height={32} borderRadius={4} bg_color="nord800" />

              <div className={classes.inputDiv}>
                <Skeleton perItem={1} height={48} borderRadius={4} bg_color="nord800" />
              </div>
            </Flex>
          </ContainerLayout>

          <ContainerLayout className={classes.removeP} padding={tableLayoutPadding}>
            <Flex style={{ width: "100%" }} direction="column" gap={12}>
              <Skeleton perItem={1} height={24} bg_color="nord800" borderRadius={4} />
              <Skeleton perItem={11} height={50} bg_color="nord800" borderRadius={4} />
            </Flex>
          </ContainerLayout>
        </Flex>
      </ContainerLayout>
    </div>
  );
};

export default DashboardAssetsUISkeleton;
