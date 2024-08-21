import AuthentificatedHeaderUI from "@/components/header/components/AuthentificatedHeaderUI/AuthentificatedHeaderUI";
import { useSignalR } from "@/hooks/useSignal/useSignalR";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const AuthentificatedHeader: React.FC<{ token: string }> = ({ token }) => {
  const [isRead, setIsRead] = useState<boolean>(false);
  const connection = useSignalR("notification", token);

  useEffect(() => {
    if (!connection) return;
    /**
     * Handle the notification count event.
     */
    connection.on("ReceiveNotificationCount", (data) => {
      setIsRead(data <= 0);
    });
    /**
     * Handle the receive event.
     */
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
  }, [connection]);

  return <AuthentificatedHeaderUI isRead={isRead} />;
};

export default AuthentificatedHeader;
