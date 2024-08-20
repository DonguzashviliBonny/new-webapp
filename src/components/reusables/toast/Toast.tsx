import { forwardRef, useCallback } from "react";

// ** 3rd party
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";

// ** components
import { Card, Flex, TextView } from "nordom-ui";

// ** icons
import { CloseIcon20, NotificationIcon20 } from "@/assets/svg";

// ** style
import classes from "./toast.module.scss";

interface NotificationToastProps extends CustomContentProps {
  title: string;
  body: string;
}

const NotificationToast = forwardRef<HTMLDivElement, NotificationToastProps>(({ id, message, body }, ref) => {
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(id);
  }, [id, closeSnackbar]);

  return (
    <SnackbarContent ref={ref}>
      <Card padding="12" borderRadius="8" className={classes.container}>
        <Flex gap={12}>
          <div className={classes.bellIconWrapper}>
            <div className="notification_alert">
              <NotificationIcon20 />
            </div>
          </div>
          <Flex direction="column" gap={4}>
            <TextView size={14}>{message}</TextView>
            <TextView size={12} color="nord400" weight="400" className={classes.truncate}>
              {body}
            </TextView>
          </Flex>
          <div className={classes.closeIconWrapper}>
            <CloseIcon20 onClick={handleDismiss} />
          </div>
        </Flex>
      </Card>
    </SnackbarContent>
  );
});

NotificationToast.displayName = "Notification";

export default NotificationToast;
