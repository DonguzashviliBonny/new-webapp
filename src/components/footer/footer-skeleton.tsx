// ** components
import { Flex, Grid, Divider, Skeleton, ContainerLayout } from "nordom-ui";

// ** hooks
import { useResponsive, useLaptop, useTablet } from "@/hooks";
import { useOidc } from "@/oidc/oidc";

// ** style
import classes from "./footer.module.scss";

// ** data
import { footerListData } from "@/assets/data/footer";

export const FooterSkeleton = () => {
  const laptop = useLaptop();
  const tablet = useTablet();
  const { isUserLoggedIn } = useOidc();

  const rowGaps = useResponsive({ desktop: 104, laptop: 80, mobile: 24 });
  const columnGaps = useResponsive({ desktop: 104, laptop: 48, mobile: undefined });
  const footerRightSectionGaps = useResponsive({ desktop: 104, laptop: 80, mobile: 32 });

  return (
    <footer className={classes.container}>
      <ContainerLayout>
        <Flex gap={laptop ? 40 : 0} direction="column">
          <Flex justify="space-between" gap={laptop ? 12 : 32} direction={laptop ? "row" : "column"}>
            <Grid
              rowGap={rowGaps}
              columnGap={columnGaps}
              columns={laptop ? "1fr 1fr 1fr" : "1fr"}
              className={classes.listContainer}
            >
              {footerListData.map(({ list }, i) =>
                !laptop ? (
                  <Skeleton key={i} perItem={1} width={121} height={18} bg_color="nord800" borderRadius={4} />
                ) : (
                  <Flex gap={12} direction="column" className={classes.titleLists}>
                    <Skeleton perItem={1} width={121} height={18} borderRadius={4} />
                    <Flex direction="column" gap={8}>
                      {list.map(({ id }) => (
                        <Skeleton key={id} perItem={1} width={87} height={18} borderRadius={4} />
                      ))}
                    </Flex>
                  </Flex>
                )
              )}
            </Grid>

            <div className={classes.footerRightSection}>
              <ContainerLayout>
                <Flex direction={"column"} gap={footerRightSectionGaps}>
                  <Flex direction="column" gap={24}>
                    <Flex direction="column" gap={16}>
                      <Skeleton
                        perItem={1}
                        width={tablet ? 308 : undefined}
                        height={41}
                        bg_color="nord800"
                        borderRadius={10}
                      />
                      <Skeleton
                        perItem={1}
                        width={tablet ? 308 : undefined}
                        height={75}
                        bg_color="nord800"
                        borderRadius={10}
                      />
                    </Flex>
                    <Flex gap={8}>
                      <Skeleton perItem={2} width={150} height={48} bg_color="nord800" borderRadius={4} />
                    </Flex>
                  </Flex>
                  <Flex direction="column" gap={12} className={classes.channels}>
                    <Skeleton perItem={1} height={28} bg_color="nord800" borderRadius={4} />

                    <div className={classes.channelsIcons}>
                      <Skeleton perItem={4} width={32} height={32} bg_color="nord800" borderRadius={4} />
                    </div>
                  </Flex>
                </Flex>
              </ContainerLayout>
            </div>
          </Flex>

          <Flex direction="column">
            <Divider margin="32" color="nord800" />

            <Flex direction="column" gap={32} align="center">
              <Flex justify="space-between" align="center" className={classes.widthFull}>
                <Skeleton perItem={1} width={121} height={18} borderRadius={4} bg_color="nord800" />

                {!tablet && !isUserLoggedIn ? null : (
                  <Skeleton perItem={1} width={87} height={17} bg_color="nord800" borderRadius={4} />
                )}

                {isUserLoggedIn ? null : (
                  <Flex gap={tablet ? 12 : 8}>
                    <Skeleton perItem={3} width={73} height={42} bg_color="nord800" borderRadius={4} />
                  </Flex>
                )}
              </Flex>

              {!tablet && !isUserLoggedIn ? (
                <Skeleton perItem={1} width={87} height={17} bg_color="nord800" borderRadius={4} />
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </ContainerLayout>
    </footer>
  );
};
