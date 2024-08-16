import { useEffect, useState } from "react";
import * as SignalR from "@microsoft/signalr";
import { SignalrHookT } from "@/types/common";
import { socketUrlMap } from "@/api/endpoints";

export const useSignalR: SignalrHookT = (url, token, testEnv) => {
  const [connection, setConnection] = useState<SignalR.HubConnection | null>(null);
  const socketUrl = testEnv ? testEnv : `${import.meta.env.VITE_WEBSOCKET_URL}${socketUrlMap[url]}`;

  useEffect(() => {
    const createConnection = async () => {
      try {
        const newConnection = new SignalR.HubConnectionBuilder()
          .withUrl(socketUrl, {
            transport: SignalR.HttpTransportType.WebSockets,
            skipNegotiation: true,
            accessTokenFactory: () => (token ? token : ""),
          })
          .withAutomaticReconnect()
          .configureLogging(SignalR.LogLevel.Error)
          .build();

        await newConnection.start();

        setConnection(newConnection);

        // eslint-disable-next-line no-console
        console.log(`SignalR connection established with ${url}`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("SignalR connection error:", error);
      }
    };

    createConnection();

    return () => {
      if (connection) {
        connection.stop();
        // eslint-disable-next-line no-console
        console.log("SignalR connection stopped");
      }
    };
    //eslint-disable-next-line
  }, [url, token, socketUrl]);

  return connection;
};
