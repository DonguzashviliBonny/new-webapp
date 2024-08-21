import { TextView, Flex, LabeledValueT, ButtonSecondary } from "nordom-ui";
import React, { useState } from "react";
import classes from "./accountNavigation.module.scss";
import { AccountIcon, ClockIcon24, DashboardIcon, SignOutIcon, UserIcon24 } from "@/assets/svg";
import { Link } from "react-router-dom";
import { useOidc } from "@/oidc/oidc";
import OverlayLayout from "@/components/layout/overlayLayout/OverlayLayout";

const AccountNavigation: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const { logout } = useOidc({ assertUserLoggedIn: true });
  const logoutHandler = () => {
    logout({ redirectTo: "home" });
  };

  const items: LabeledValueT[] = [
    {
      title: (
        <Link to={"/"}>
          <Flex align="center" gap={8}>
            <DashboardIcon />
            <TextView size={14} color="nord400" weight="500">
              Personal Dashboard
            </TextView>
          </Flex>
        </Link>
      ),
      content: "0",
    },
    {
      title: (
        <Link to={"/dashboard/settings"}>
          <Flex align="center" gap={8}>
            <AccountIcon />
            <TextView size={14} color="nord400" weight="500">
              Account
            </TextView>
          </Flex>
        </Link>
      ),
      content: "1",
    },
    {
      title: (
        <Link to={"/transaction-history"}>
          <Flex align="center" gap={8}>
            <ClockIcon24 />
            <TextView size={14} color="nord400" weight="500">
              Transaction History
            </TextView>
          </Flex>
        </Link>
      ),
      content: "2",
    },
    {
      title: (
        <Flex onClick={logoutHandler} align="center" gap={8}>
          <SignOutIcon />
          <TextView size={14} color="nord400" weight="500">
            Log Out
          </TextView>
        </Flex>
      ),
      content: "3",
    },
  ];

  return (
    <>
      <ButtonSecondary icon className={classes.icons} size="small" onClick={() => setOpenDropdown((prev) => !prev)}>
        <UserIcon24 height={22} width={22} />
      </ButtonSecondary>
      <OverlayLayout open={openDropdown} setOpen={setOpenDropdown}>
        {items.map((el) => (
          <Flex className={classes.dropItem} gap={8}>
            {el.title}
          </Flex>
        ))}
      </OverlayLayout>
    </>
  );
};

export default AccountNavigation;
