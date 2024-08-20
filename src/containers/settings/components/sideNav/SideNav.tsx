import { AccountIcon, DebitCardIcon, FilterIcon24, SecurityIcon, UserIcon24 } from "@/assets/svg";
import { Flex, TextView } from "nordom-ui";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./sideNav.module.scss";
import { useHashLinkScroll } from "@/hooks/useHashLinkScroll/useHashLinkScroll";

const links = [
  { name: "Verification", hash: "#verification", icon: <UserIcon24 /> },
  { name: "Payment", hash: "#payment", icon: <DebitCardIcon /> },
  { name: "Preferences", hash: "#preferences", icon: <FilterIcon24 /> },
  { name: "Security", hash: "#security", icon: <SecurityIcon /> },
  { name: "Account", hash: "#account", icon: <AccountIcon /> },
];

const SideNav = () => {
  useHashLinkScroll();
  const { hash } = useLocation();
  const [activeHash, setActiveHash] = useState(links[0].hash);

  useEffect(() => {
    const found = links.find((link) => link.hash === hash);
    if (found) {
      setActiveHash(hash);
    }
  }, [hash]);

  return (
    <Flex direction={"row"} align="flex-start" className={classes.asideNav}>
      {links.map(({ name, hash, icon }) => (
        <Link key={hash} to={hash} className={`${classes.link} ${hash === activeHash ? classes.active : ""}`}>
          <TextView size={12}>
            <Flex align="center" gap={8}>
              {icon}
              {name}
            </Flex>
          </TextView>
        </Link>
      ))}
    </Flex>
  );
};

export default SideNav;
