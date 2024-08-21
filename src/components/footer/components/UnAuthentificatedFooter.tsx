// ** components
import { ButtonPrimary, ButtonSecondary, DirectionT, Flex, TextView, TextViewLevelT } from "nordom-ui";

// ** style
import classes from "../footer.module.scss";

// ** hooks
import { useLaptop } from "@/hooks";
import { useOidc } from "@/oidc/oidc";
import { useResponsive } from "@/hooks";

// ** types
import { FooterUIProps } from "@/types/components/layout/layoutProps";

const UnauthenticatedFooter: React.FC<FooterUIProps> = (props) => {
  const laptop = useLaptop();
  const { isUserLoggedIn, login } = useOidc();

  const loginHandler = () => {
    if (!isUserLoggedIn) login({ doesCurrentHrefRequiresAuth: true });
  };

  const sectionDirections: DirectionT = useResponsive({ laptop: "column", tablet: "row", mobile: "column" });
  const titleLevel: TextViewLevelT = useResponsive({ laptop: 32, mobile: 24 });
  const subtitleLevel: TextViewLevelT = useResponsive({ laptop: 16, mobile: 14 });

  const { attributes } = props.data.data;

  const { Title, Subtitle, TitleSignIn, TitleSignUp } = attributes;

  return (
    <section className={classes.loginSection}>
      <Flex gap={24} direction={sectionDirections} align="flex-start">
        <Flex gap={12} direction="column">
          <TextView size={titleLevel} color="nord50" weight="700" className={classes.title}>
            {Title}
          </TextView>
          <TextView size={subtitleLevel} color="nord400" weight="400">
            {Subtitle}
          </TextView>
        </Flex>
        <Flex gap={12} direction={laptop ? "row" : "column-reverse"} className={classes.widthFull}>
          <ButtonSecondary fill size="large">
            <TextView size={16} color="nord50" weight="700">
              {TitleSignUp}
            </TextView>
          </ButtonSecondary>
          <ButtonPrimary fill size="large" onClick={loginHandler}>
            <TextView size={16} color="nord50" weight="700">
              {TitleSignIn}
            </TextView>
          </ButtonPrimary>
        </Flex>
      </Flex>
    </section>
  );
};

export default UnauthenticatedFooter;
