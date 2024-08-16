import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { OidcProvider } from "./oidc/oidc.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/client/queryClient.ts";
import { BrowserRouter } from "react-router-dom";
import "@/scss/global.scss";
import { SnackbarProvider } from "notistack";
import NotificationToast from "./components/reusables/toast/toast.tsx";

console.log("SnackbarProvider dasamatebelia");

declare module "notistack" {
  interface VariantOverrides {
    notificationToast: {
      body: string;
    };
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <OidcProvider fallback={<>loading...</>}>
        <BrowserRouter>
          <SnackbarProvider autoHideDuration={3000} maxSnack={5} Components={{ notificationToast: NotificationToast }}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </OidcProvider>
    </QueryClientProvider>
  </StrictMode>
);
