import React from "react";

// ** components
import { Link } from "react-router-dom";
import { TextView, Flex, Dropdown, LabeledValueT, ButtonSecondary } from "nordom-ui";

// ** style
import classes from "../header.module.scss";

// ** icons
import { AccountIcon, ClockIcon24, DashboardIcon, SignOutIcon, UserIcon24 } from "@/assets/svg";

// ** hooks
import { useOidc } from "@/oidc/oidc";

const AccountNavigation: React.FC = () => {
  const { logout } = useOidc({ assertUserLoggedIn: true });

  const logoutHandler = () => {
    logout({ redirectTo: "home" });
  };

  const items: LabeledValueT[] = [
    {
      title: <LinkComponent to="/" Icon={<DashboardIcon />} title="Personal Dashboard" />,
      content: "0",
    },
    {
      title: <LinkComponent to="/dashboard/settings" title="Account" Icon={<AccountIcon />} />,
      content: "1",
    },
    {
      title: <LinkComponent to="/transaction-history" title="Transaction History" Icon={<ClockIcon24 />} />,
      content: "2",
    },
    {
      title: (
        <Flex onClick={logoutHandler} align="center" gap={8}>
          <SignOutIcon />
          <TextView size={12}>Log Out</TextView>
        </Flex>
      ),
      content: "3",
    },
  ];

  return (
    <Dropdown contentClassName={classes.navigationDropdown} menu={{ options: items }}>
      <ButtonSecondary icon className={classes.icons} size="small" role="accountBtn" data-testid="acc-icon">
        <UserIcon24 />
      </ButtonSecondary>
    </Dropdown>
  );
};

export default AccountNavigation;

const LinkComponent = ({ to, Icon, title }: { to: string; Icon: React.ReactNode; title: string }) => {
  return (
    <Link to={to}>
      <Flex align="center" gap={8}>
        {Icon}
        <TextView size={12}>{title}</TextView>
      </Flex>
    </Link>
  );
};
