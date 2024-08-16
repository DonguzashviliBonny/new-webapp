import { createReactOidc } from "oidc-spa/react";

export const { OidcProvider, useOidc, getOidc } = createReactOidc({
  issuerUri: import.meta.env.VITE_KEYCLOAK_URL,
  clientId: import.meta.env.VITE_CLIENT_ID,
  publicUrl: import.meta.env.BASE_URL,
  autoLogoutParams: { redirectTo: "current page" },
});
