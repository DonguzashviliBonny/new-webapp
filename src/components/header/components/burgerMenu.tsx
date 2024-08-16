import { Divider, Flex, ButtonSecondary, ButtonPrimary, Card, TextView } from "nordom-ui";
import { CloseIcon20 } from "@/assets/svg";
import classes from "../header.module.scss";

import CloseIcon from "@/assets/svg/close-icon-20.svg";

import { Link } from "react-router-dom";
import { useOidc } from "@/oidc/oidc";
import { burgerMenuLoggedInData, burgerMenuLoggedOutData } from "@/assets/data/header";

type BurgerMenuProps = {
  onCloseMenu: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onCloseMenu }) => {
  const { isUserLoggedIn, login, logout } = useOidc();

  const data = isUserLoggedIn ? burgerMenuLoggedInData : burgerMenuLoggedOutData;

  const loginHandler = () => {
    if (!isUserLoggedIn) login({ doesCurrentHrefRequiresAuth: true });
  };

  const logoutHandler = () => {
    if (isUserLoggedIn)
      logout({
        redirectTo: "home",
      });
  };

  return (
    <Card paddingBlock="24" paddingInline="16">
      <Flex direction="column" gap={4} className={classes.burger} data-testid="burger-menu">
        <Flex justify="flex-end">
          {/* <CloseIcon20 className={classes.closeIcon} onClick={onCloseMenu} /> */}
          <CloseIcon className={classes.closeIcon} onClick={onCloseMenu} />
        </Flex>

        <Flex direction="column">
          <Flex gap={8} direction="column">
            {data.map(({ link, title, Icon }) => (
              <Card padding="8" key={title}>
                <Link
                  to={link}
                  onClick={link === "" ? logoutHandler : onCloseMenu}
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
                <ButtonSecondary fill onClick={loginHandler}>
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
  );
};

export default BurgerMenu;
