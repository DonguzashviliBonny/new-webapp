// ** components
import { ButtonSecondary, Card, Dropdown, Flex, TextView } from "nordom-ui";

// ** icons
import { QRCodeIcon } from "@/assets/svg";

// ** style
import classes from "../header.module.scss";

// 3rd party
import QRCode from "qrcode.react";

const QRCodeDropdown = () => {
  return (
    <Dropdown
      contentClassName={classes.dropdownContent}
      className={classes.dropdown}
      menu={{
        options: [],
        renderMenu: () => <DropdownContent />,
      }}
    >
      <ButtonSecondary icon size="small" role="QRIcon-btn" data-testid="qr-icon">
        <div className={classes.qrIcon}>
          <QRCodeIcon />
        </div>
      </ButtonSecondary>
    </Dropdown>
  );
};

export default QRCodeDropdown;

const DropdownContent = () => {
  return (
    <Card>
      <Flex direction="column" align="center" justify="center" gap={12}>
        <Card padding="12" bg_color="nord50">
          <QRCode value="" size={100} />
        </Card>
        <TextView size={12} color="nord50" className={classes.textCenter}>
          Scan to Download App IOS&Android
        </TextView>
      </Flex>
    </Card>
  );
};
