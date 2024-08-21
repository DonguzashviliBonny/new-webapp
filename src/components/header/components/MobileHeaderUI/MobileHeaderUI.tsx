import { Flex, Drawer, ButtonSecondary, Card, Divider, TextView, ButtonPrimary } from "nordom-ui";
import { BurgerMenuIcon, CloseIcon20 } from "@/assets/svg";
import { useState } from "react";
import classes from "./MobileHeaderUI.module.scss";
import { Link } from "react-router-dom";
import { MobileHeaderUIProps } from "@/types/components/layout/layoutProps";
import { useLaptop } from "@/hooks";

const MobileHeaderUI: React.FC<MobileHeaderUIProps> = ({ login, logout, data, isUserLoggedIn }) => {
  const laptop = useLaptop();
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  if (laptop) return <></>;

  return (
    <Flex justify="space-between" align="center" data-testid="mobile-header">
      <ButtonSecondary icon size="small" onClick={() => setOpenBurgerMenu(true)} data-testid="burger-menu-icon">
        <BurgerMenuIcon width={"18"} height={"18"} viewBox="0 0 22 18" />
      </ButtonSecondary>

      <Drawer width="296px" open={openBurgerMenu} onClose={() => setOpenBurgerMenu(false)}>
        <Card paddingBlock="24" paddingInline="16">
          <Flex direction="column" gap={4} className={classes.burger} data-testid="burger-menu">
            <Flex justify="flex-end">
              <CloseIcon20 className={classes.closeIcon} onClick={() => setOpenBurgerMenu(false)} />
            </Flex>

            <Flex direction="column">
              <Flex gap={8} direction="column">
                {data.map(({ link, Icon, title }) => (
                  <Card padding="8" key={title}>
                    <Link
                      to={link}
                      onClick={link === "" ? logout : () => setOpenBurgerMenu(false)}
                      role={link === "" ? "logoutBtn" : ""}
                    >
                      <Flex gap={12} align="center">
                        <Icon className={classes.icon} />

                        <TextView size={14} color="nord400">
                          {title}
                        </TextView>
                      </Flex>
                    </Link>
                  </Card>
                ))}
              </Flex>

              {!isUserLoggedIn && (
                <>
                  <Divider color="nord800" />

                  <Flex gap={8}>
                    <ButtonSecondary fill onClick={login}>
                      <TextView size={14}>Log In</TextView>
                    </ButtonSecondary>

                    <ButtonPrimary fill>
                      <TextView size={14}>Sign Up</TextView>
                    </ButtonPrimary>
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>
        </Card>
      </Drawer>
    </Flex>
  );
};

export default MobileHeaderUI;
