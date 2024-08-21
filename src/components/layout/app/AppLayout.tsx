// ** components
import { Flex } from "nordom-ui";
import { Outlet } from "react-router-dom";
import FooterContainer from "@/containers/footer/Footer";
import Header from "@/containers/header/Header";

// ** style
import classes from "./appLayout.module.scss";

const AppLayout = () => {
  return (
    <Flex direction="column" className={classes.appLayout}>
      <Header />
      <Flex direction="column" className={classes.appContent}>
        <Outlet />
      </Flex>
      <FooterContainer />
    </Flex>
  );
};

export default AppLayout;
