// ** style
import classes from "../header.module.scss";

// ** hooks
import { useOidc } from "@/oidc/oidc";

// ** components
import { Divider, Flex, TextView, ButtonSecondary } from "nordom-ui";
import QRCodeDropdown from "./qrCodeDropdown";

const UnauthenticatedHeader = () => {
  const { isUserLoggedIn, login } = useOidc({ assertUserLoggedIn: false });

  const loginHandler = () => {
    if (!isUserLoggedIn)
      login({
        doesCurrentHrefRequiresAuth: false,
        extraQueryParams: {},
      });
  };

  const signUpHandler = () => {
    if (!isUserLoggedIn)
      login({
        doesCurrentHrefRequiresAuth: false,
        extraQueryParams: {
          goto_registration: "true",
          email: "asd@gmail.com",
        },
      });
  };

  return (
    <Flex align="center" data-testid="unauthenticated-header">
      <Flex align="center">
        <div onClick={loginHandler} style={{ padding: "8px 24px" }}>
          <TextView className={classes.textLink} size={14} weight="700" color="nord300">
            Log In
          </TextView>
        </div>

        <ButtonSecondary size="small" style={{ paddingBlock: 8 }} role="signupBtn" onClick={signUpHandler}>
          <TextView size={14} weight="700" className={classes.textLink}>
            Sign Up
          </TextView>
        </ButtonSecondary>
      </Flex>
      <div className={classes.divider}>
        <Divider color="nord800" direction="vertical" margin="8" role="separator" />
      </div>
      <QRCodeDropdown />
    </Flex>
  );
};

export default UnauthenticatedHeader;
