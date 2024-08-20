import { Link } from "react-router-dom";

// ** style
import classes from "../Header.module.scss";

// ** icons
import { NotificationIcon20 } from "@/assets/svg";

// ** 3rd party
import { enqueueSnackbar } from "notistack";

// ** hooks
import { useLaptop, useTablet } from "@/hooks";
import { useEffect, useState } from "react";
import { useOidc } from "@/oidc/oidc";
import { useSignalR } from "@/hooks/useSignal/useSignalR";

// ** components
import { TextView, Flex, Divider, ButtonPrimary, ButtonSecondary } from "nordom-ui";
import AccountNavigation from "./AccountNavigation";
import QRCodeDropdown from "./qrCodeDropdown";

const AuthenticatedHeader: React.FC = () => {
  const laptop = useLaptop();
  const tablet = useTablet();
  const [isRead, setIsRead] = useState<boolean>(false);

  const { oidcTokens } = useOidc({ assertUserLoggedIn: true });

  const token = oidcTokens.accessToken;
  const connection = useSignalR("notification", token);

  useEffect(() => {
    if (connection) {
      connection.on("ReceiveNotificationCount", (data) => {
        setIsRead(data <= 0);
      });
      connection.on("receive", (data: { title: string; body: string }) => {
        enqueueSnackbar(data.title, {
          variant: "notificationToast",
          preventDuplicate: true,
          transitionDuration: 500,
          autoHideDuration: null,
          anchorOrigin: { horizontal: "right", vertical: "bottom" },
          body: data.body,
        });
      });
    }
  }, [connection]);

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
              <div className={isRead ? "" : "notification_alert"}>
                <NotificationIcon20 />
              </div>
            </ButtonSecondary>
          </Link>
        )}
        <QRCodeDropdown data-testid="qr-icon" />
        {laptop && <AccountNavigation data-testid="account-btn" />}
      </Flex>
    </Flex>
  );
};

export default AuthenticatedHeader;
