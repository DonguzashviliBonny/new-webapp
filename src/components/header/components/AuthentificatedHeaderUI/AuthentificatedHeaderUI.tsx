import { NotificationIcon20 } from "@/assets/svg";
import { useLaptop, useTablet } from "@/hooks";
import { ButtonPrimary, ButtonSecondary, Divider, Flex, TextView } from "nordom-ui";
import { Link } from "react-router-dom";
import classes from "../../header.module.scss";
import QRCodeDropdown from "../QrCodeDropdown/QRCodeDropdown";
import AccountNavigation from "../AccountNavigation/AccountNavigation";

const AuthentificatedHeaderUI = ({ isRead }: { isRead: boolean }) => {
  const tablet = useTablet();
  const laptop = useLaptop();

  return (
    <Flex align="center" data-testid="authenticated-header">
      <Link to={"/transactions/deposit"}>
        <ButtonPrimary size="small" role="authDepositBtn">
          <TextView size={14}>Deposit</TextView>
        </ButtonPrimary>
      </Link>

      <div className={classes.divider}>
        <Divider direction="vertical" margin="8" color="nord800" />
      </div>

      <Flex gap={8} align="center">
        {tablet && (
          <Link to={"/notifications"}>
            <ButtonSecondary icon className={classes.icons} size="small" data-testid="notification-icon">
              <Flex className={isRead ? "" : "notification_alert"}>
                <NotificationIcon20 width={22} height={22} />
              </Flex>
            </ButtonSecondary>
          </Link>
        )}

        <QRCodeDropdown data-testid="qr-icon" />

        {laptop && <AccountNavigation data-testid="account-btn" />}
      </Flex>
    </Flex>
  );
};

export default AuthentificatedHeaderUI;
