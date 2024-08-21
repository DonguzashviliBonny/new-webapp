import { ButtonSecondary, Divider, Flex, TextView } from "nordom-ui";
import QRCodeDropdown from "../QrCodeDropdown/QRCodeDropdown";
import classes from "../../header.module.scss";

const UnAuthentificatedHeaderUI: React.FC<{ login: () => void; signUp: () => void }> = ({ login, signUp }) => {
  return (
    <Flex align="center" data-testid="unauthenticated-header">
      <Flex align="center">
        <div onClick={login} style={{ padding: "8px 24px" }}>
          <TextView className={classes.textLink} size={14} weight="700" color="nord300">
            Log In
          </TextView>
        </div>

        <ButtonSecondary size="small" style={{ paddingBlock: 8 }} role="signupBtn" onClick={signUp}>
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

export default UnAuthentificatedHeaderUI;
