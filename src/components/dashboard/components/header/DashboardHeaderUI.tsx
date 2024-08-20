// ** components
import LazyImage from "@/components/reusables/lazyImg/LazyImg";
import {
  AlignT,
  ButtonSecondary,
  ContainerLayout,
  Copy,
  DirectionT,
  Flex,
  Tag,
  TextView,
  TextViewLevelT,
} from "nordom-ui";

// ** data
import { navigateData } from "@/assets/data/dashboard";

// ** style
import classes from "./dashboardHeaderUI.module.scss";

// ** hooks
import { useMobile, useResponsive, useTablet } from "@/hooks";
import { useNavigate } from "react-router-dom";

// ** types
import { formatAmountToString } from "@/utils/format/format";

// ** icons
import { CopyIcon, InvisibleIcon, VisibleIcon } from "@/assets/svg";
import DashboardHeaderSkeleton from "./DashboardHeaderUI-skeleton";
import { DashboardHeaderProps } from "@/types/components/dashboard/dashboardProps";

const DashboardHeaderUI = ({ userDetails, estBalance, cryptoAsset, handleHide, hide }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const isMobile = useMobile();
  const isTablet = useTablet();

  const balanceFontSize: TextViewLevelT = useResponsive({ laptop: 20, tablet: 16, mobile: 14 });
  const navigationsFontSize: TextViewLevelT = useResponsive({ laptop: 14, tablet: 12, mobile: 14 });
  const containerAlign: AlignT = useResponsive({ mobile: "flex-start", tablet: "center" });
  const containerDirection: DirectionT = useResponsive({ mobile: "column", tablet: "row" });
  const containerGap = useResponsive({ mobile: 32, tablet: 0 });
  const userNameSize: TextViewLevelT = useResponsive({ mobile: 16, tablet: 20 });

  const { avatarUri, userName, publicId } = userDetails;

  if (!estBalance) return <DashboardHeaderSkeleton />;

  return (
    <ContainerLayout bg_color="nord950" border_bottom padding={{ block: 24 }}>
      <Flex
        align={containerAlign}
        direction={containerDirection}
        gap={containerGap}
        justify="space-between"
        className={classes.content}
      >
        <Flex gap={12}>
          <div className={classes.profileImg}>
            <LazyImage src={avatarUri} alt={"avatar"} />
          </div>

          <Flex direction="column" gap={12}>
            <Flex direction="column" gap={8}>
              <Flex gap={8} align="center">
                <TextView size={userNameSize} weight="700">
                  {userName}
                </TextView>
              </Flex>

              <div className={classes.tagWrapper}>
                <Copy textToCopy={publicId ? publicId?.toString() : ""}>
                  <Tag className={classes.tagWrapper} bg_color="nord800" paddingInline="8" paddingBlock="4">
                    <Flex align="center" justify="center" gap={4}>
                      <TextView style={{ whiteSpace: "nowrap" }} size={12}>
                        ID: {publicId}
                      </TextView>

                      <CopyIcon />
                    </Flex>
                  </Tag>
                </Copy>
              </div>
            </Flex>

            <Flex onClick={handleHide} align="center" gap={4}>
              {hide ? (
                <Flex align="center" justify="center" className={classes.hideBtnWrapper}>
                  <InvisibleIcon className={classes.hideBtn} />
                </Flex>
              ) : (
                <Flex align="center" justify="center" className={classes.hideBtnWrapper}>
                  <VisibleIcon className={classes.hideBtn} />
                </Flex>
              )}
              <Flex align="center" gap={4}>
                <TextView size={isMobile ? 14 : 16} color="nord400">
                  {"Est."} Balance:
                </TextView>

                <TextView size={balanceFontSize} weight="700">
                  {hide
                    ? [...Array(estBalance?.fiatBalance.toString().length)].map(() => "*")
                    : formatAmountToString(estBalance?.fiatBalance.toString(), 2)}
                </TextView>
              </Flex>

              {!isMobile && (
                <>
                  <TextView size={!isTablet ? 16 : 20} color="nord400">
                    ≈
                  </TextView>
                  <TextView size={!isTablet ? 14 : 16} color="nord400">
                    {hide
                      ? [...Array(estBalance && estBalance?.cryptoBalance.toString().length + cryptoAsset.length)].map(
                          () => "*"
                        )
                      : `${cryptoAsset} ${formatAmountToString(estBalance?.cryptoBalance.toString())}`}
                  </TextView>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          justify={isTablet ? undefined : "center"}
          align="center"
          gap={32}
          style={{ width: isTablet ? "auto" : "100%" }}
        >
          {navigateData.map(({ Icon, href, title }, i) => (
            <Flex direction="column" align="center" gap={8} key={i}>
              <ButtonSecondary
                icon
                className={classes.navigateIconsWrapper}
                size="small"
                onClick={() => navigate(href)}
              >
                <Icon className={classes.navigateIcons} />
              </ButtonSecondary>

              <TextView size={navigationsFontSize}>{title}</TextView>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </ContainerLayout>
  );
};

export default DashboardHeaderUI;
