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
import DashboardHeaderSkeleton from "./DashboardHeaderUI-skeleton";

// ** data
import { navigateData } from "@/assets/data/dashboard";

// ** style
import classes from "./dashboardHeaderUI.module.scss";

// ** hooks
import { useMobile, useResponsive, useTablet } from "@/hooks";
import { useNavigate } from "react-router-dom";

// ** types
import { formatAmountToString } from "@/utils/format/format";
import { DashboardHeaderUIProps } from "@/types";

// ** icons
import { CopyIcon, InvisibleIcon, VisibleIcon } from "@/assets/svg";

/**
 * DashboardHeaderUI component displays user's details and balance. It also renders navigation links.
 *
 * @param {Object} props - The component props
 * @param {Object} props.userDetails - The user's details
 * @param {string} props.userDetails.avatarUri - The user's avatar URI
 * @param {string} props.userDetails.userName - The user's name
 * @param {number|null} props.userDetails.publicId - The user's public ID
 * @param {Object} props.estBalance - The estimated balance
 * @param {string} props.cryptoAsset - The crypto asset
 * @param {Function} props.handleHide - The function to handle hiding balance
 * @param {boolean} props.hide - Indicates whether to hide balance
 * @returns {JSX.Element} The rendered component
 */
const DashboardHeaderUI: React.FC<DashboardHeaderUIProps> = (props) => {
  const { userDetails, estBalance, cryptoAsset, handleHide, hide } = props;

  // Destructure props
  const { avatarUri, userName, publicId } = userDetails;

  // Hooks
  const navigate = useNavigate();
  const isMobile = useMobile();
  const isTablet = useTablet();

  // Responsive values
  const balanceFontSize: TextViewLevelT = useResponsive({ laptop: 20, tablet: 16, mobile: 14 });
  const navigationsFontSize: TextViewLevelT = useResponsive({ laptop: 14, tablet: 12, mobile: 14 });
  const containerAlign: AlignT = useResponsive({ mobile: "flex-start", tablet: "center" });
  const containerDirection: DirectionT = useResponsive({ mobile: "column", tablet: "row" });
  const containerGap = useResponsive({ mobile: 32, tablet: 0 });
  const userNameSize: TextViewLevelT = useResponsive({ mobile: 16, tablet: 20 });

  // If estBalance is falsy, render skeleton
  if (!estBalance) {
    return <DashboardHeaderSkeleton />;
  }

  return (
    <ContainerLayout bg_color="nord950" border_bottom padding={{ block: 24 }}>
      <Flex
        align={containerAlign}
        direction={containerDirection}
        gap={containerGap}
        justify="space-between"
        className={classes.content}
      >
        {/* Render user's avatar, name, and public ID */}
        <Flex gap={12}>
          <div className={classes.profileImg}>
            <LazyImage src={avatarUri} alt="avatar" />
          </div>

          <Flex direction="column" gap={12}>
            <Flex direction="column" gap={8}>
              <Flex gap={8} align="center">
                <TextView size={userNameSize} weight="700">
                  {userName}
                </TextView>
              </Flex>

              <div className={classes.tagWrapper}>
                {/* Render copy button */}
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

            {/* Render hide balance button */}
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

              {/* Render estimated balance */}
              <Flex align="center" gap={4}>
                <TextView size={balanceFontSize} color="nord400">
                  {"Est."} Balance:
                </TextView>

                <TextView size={balanceFontSize} weight="700">
                  {hide
                    ? [...Array(estBalance?.fiatBalance.toString().length)].map(() => "*")
                    : formatAmountToString(estBalance?.fiatBalance.toString(), 2)}
                </TextView>
              </Flex>

              {/* Render estimated balance in crypto asset */}
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

        {/* Render navigation links */}
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
