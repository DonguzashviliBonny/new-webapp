import { Link } from "react-router-dom";

// ** style
import classes from "./Header.module.scss";

// ** hooks
import usePreferencesStore from "@/store/preferencesStore";
import { useDesktop, useLaptop, useTablet } from "@/hooks";

// ** icons
import { InfoIcon24, LogoIconDark, LogoIconLight } from "@/assets/svg";

// ** data
import { headerLinks } from "@/assets/data/header";

// ** components
import { TextView, Flex, Card, ContainerLayout } from "nordom-ui";

const HeaderUI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = usePreferencesStore();

  const tablet = useTablet();
  const laptop = useLaptop();
  const desktop = useDesktop();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.blur();
  };

  return (
    <header className={classes.headerContainer}>
      <ContainerLayout className={classes.warningContainer}>
        <Flex align="center" justify="center" className={classes.warningIconContainer} gap={8}>
          <InfoIcon24 />
          <TextView size={16}>
            Our website is currently under construction.{" "}
            {tablet && <TextView size={16}>Registration and login are temporarily unavailable.</TextView>}{" "}
            {laptop && <TextView size={16}>Thank you for your patience.</TextView>}
          </TextView>
        </Flex>
      </ContainerLayout>

      <ContainerLayout className={classes.header}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={desktop ? 45 : 24}>
            <Link to="/" type="secondary">
              {theme === "Dark Mode" ? (
                <LogoIconDark data-testid="logo-dark" />
              ) : (
                <LogoIconLight data-testid="logo-light" />
              )}
            </Link>

            {laptop && (
              <Flex>
                {headerLinks.links.map((link, i) => (
                  <Link to={link.to} className={classes.navBarLink} onClick={handleLinkClick} type="secondary" key={i}>
                    <Card padding="20" bg_color="transparent">
                      <TextView size={16}>{link.label}</TextView>
                    </Card>
                  </Link>
                ))}
              </Flex>
            )}
          </Flex>
          <Flex align="center" gap={8}>
            {children}
          </Flex>
        </Flex>
      </ContainerLayout>
    </header>
  );
};

export default HeaderUI;
