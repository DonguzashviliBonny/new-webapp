import { useUserInformationReq } from "@/api/requests/user";
import { useOidc } from "@/oidc/oidc";
import classes from "./settings.module.scss";
import VerificationContainer from "./components/verification/Verification";

const SettingsContainer = () => {
  const {
    oidcTokens: { accessToken },
  } = useOidc({ assertUserLoggedIn: true });

  const { data, isLoading } = useUserInformationReq(accessToken);
  console.log(data);

  const props = {
    token: accessToken,
    isLoading,
  };

  return (
    <section className={classes.settings}>
      <VerificationContainer {...props} />
    </section>
  );
};

export default SettingsContainer;
