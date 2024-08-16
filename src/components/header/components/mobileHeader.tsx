// ** icons
import { BurgerMenuIcon } from "@/assets/svg";

// ** hooks
import { useState } from "react";

// ** components
import { Flex, Drawer, ButtonSecondary } from "nordom-ui";
import BurgerMenu from "./burgerMenu";

const MobileHeader: React.FC = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);

  const handleOpenBurgerMenu = () => {
    setOpenBurgerMenu(true);
  };
  const handleCloseBurgerMenu = () => {
    setOpenBurgerMenu(false);
  };

  return (
    <Flex justify="space-between" align="center" data-testid="mobile-header">
      <ButtonSecondary icon size="small" onClick={handleOpenBurgerMenu} data-testid="burger-menu-icon">
        <BurgerMenuIcon />
      </ButtonSecondary>

      <Drawer width="296px" open={openBurgerMenu} onClose={handleCloseBurgerMenu}>
        <BurgerMenu onCloseMenu={handleCloseBurgerMenu} />
      </Drawer>
    </Flex>
  );
};

export default MobileHeader;
