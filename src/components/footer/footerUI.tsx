// ** icons
import { LogoIconDark, LogoIconLight } from "@/assets/svg";

// ** style
import classes from "./Footer.module.scss";

// ** store
import usePreferencesStore from "@/store/preferencesStore";

// ** hooks
import { useDesktop, useLaptop, useTablet } from "@/hooks";
import { useResponsive } from "@/hooks";
import { useOidc } from "@/oidc/oidc";

// ** types
import { FooterContentT } from "@/api/types/layout";

// ** data
import { footerListData } from "@/assets/data/footer";

// ** icons
import { ChevronDownIcon24, ChevronUpIcon24 } from "@/assets/svg/arrows";

// ** components
import { Link } from "react-router-dom";
import { Divider, Flex, TextView, Collapse, Grid, ContainerLayout } from "nordom-ui";
import LazyImage from "../reusables/lazyImg/lazyImg";
import CommunityChannels from "./components/communityChannels";
import AuthenticatedFooter from "./components/authentificatedFooter";
import UnauthenticatedFooter from "./components/unAuthentificatedFooter";

const FooterUI: React.FC<FooterContentT> = (props) => {
  const desktop = useDesktop();
  const laptop = useLaptop();
  const tablet = useTablet();
  const { theme } = usePreferencesStore();
  const { isUserLoggedIn } = useOidc();

  const rowGaps = useResponsive({ desktop: 104, laptop: 80, mobile: 24 });
  const columnGaps = useResponsive({ desktop: 104, laptop: 48, mobile: undefined });
  const footerRightSectionGaps = useResponsive({ desktop: 104, laptop: 80, mobile: 32 });

  const certificatesImageWidth = useResponsive({ laptop: 73, tablet: 53, mobile: 51 });

  const { channels, certificates, TitleChannels } = props.data.attributes;

  const { data: certificatesData } = certificates;

  const copyRightRenderer = () => {
    if (desktop) return `© 2024 BAM Trading Services Inc. d.b.a.`;

    return `© 2024 Nordom.com`;
  };

  const listDataRenderer = () => {
    if (laptop) return footerListData;

    const filteredData = footerListData.sort((a, b) => a.key - b.key);

    return filteredData;
  };

  return (
    <ContainerLayout bg_color="nord950">
      <footer className={classes.container} role="footer">
        <div className={classes.layout}>
          <Flex gap={laptop ? 40 : 0} direction="column">
            <Flex justify="space-between" gap={laptop ? 16 : 32} direction={laptop ? "row" : "column"}>
              <Grid
                rowGap={rowGaps}
                columnGap={columnGaps}
                columns={laptop ? "1fr 1fr 1fr" : "1fr"}
                className={classes.listContainer}
              >
                {listDataRenderer().map(({ title, list }) =>
                  laptop ? (
                    <TitleList title={title} list={list} key={title} />
                  ) : (
                    <Collapse
                      title={
                        <TextView size={tablet ? 20 : 16} weight="700">
                          {title}
                        </TextView>
                      }
                      content={list.map((item) => (
                        <Flex direction="column" gap={8} className={classes.collapseListItem}>
                          <Link to={item.link} key={item.id}>
                            <TextView size={14} color="nord400" weight="400">
                              {item.text}
                            </TextView>
                          </Link>
                        </Flex>
                      ))}
                      key={title}
                      classNameTitle={`${classes.collapseTexts} ${classes.collapseTitle}`}
                      expandIcon={<ChevronDownIcon24 />}
                      expandedIcon={<ChevronUpIcon24 />}
                    />
                  )
                )}
              </Grid>

              <div className={classes.footerRightSection}>
                <Flex direction={"column"} gap={footerRightSectionGaps}>
                  {isUserLoggedIn ? (
                    <AuthenticatedFooter data={certificatesData} />
                  ) : (
                    <UnauthenticatedFooter data={props.data} />
                  )}
                  <CommunityChannels TitleChannels={TitleChannels} data={channels.data} />
                </Flex>
              </div>
            </Flex>

            <Flex direction="column">
              <Divider margin="32" color="nord800" />

              <Flex direction="column" gap={32} align="center">
                <Flex justify="space-between" align="center" className={classes.widthFull}>
                  <Link to="/" type="secondary" role="themeRole">
                    {theme === "Dark Mode" ? <LogoIconDark /> : <LogoIconLight />}
                  </Link>

                  {!tablet && !isUserLoggedIn ? null : (
                    <TextView size={tablet ? 16 : 14} weight="400">
                      {copyRightRenderer()}
                    </TextView>
                  )}

                  {!isUserLoggedIn && (
                    <Flex gap={tablet ? 12 : 8}>
                      {certificatesData.map((item) => (
                        <LazyImage
                          key={item.id}
                          alt={item.attributes.Name}
                          src={item.attributes.Image.data.attributes.url}
                          width={certificatesImageWidth}
                          height={tablet ? 40 : 29}
                        />
                      ))}
                    </Flex>
                  )}
                </Flex>

                {!tablet && !isUserLoggedIn ? (
                  <TextView size={14} weight="400">
                    &#169; 2024 BAM Trading Services Inc. d.b.a.
                  </TextView>
                ) : null}
              </Flex>
            </Flex>
          </Flex>
        </div>
      </footer>
    </ContainerLayout>
  );
};

export default FooterUI;

const TitleList: React.FC<Omit<(typeof footerListData)[0], "key">> = ({ title, list }) => {
  return (
    <Flex gap={12} direction="column" className={classes.titleLists}>
      <TextView size={20} weight="500">
        {title}
      </TextView>
      <Flex direction="column" gap={8}>
        {list.map(({ id, text, link }) => (
          <Link key={id} to={link}>
            <TextView size={16} color="nord400" weight="400">
              {text}
            </TextView>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
