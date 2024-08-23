// ** components
import { Outlet } from "react-router-dom";
import FooterContainer from "@/containers/footer/Footer";
import Header from "@/containers/header/Header";

// ** style
import classes from "./appLayout.module.scss";

const AppLayout = () => {
  return (
    <div className={classes.appLayout}>
      <Header />
      <div className={classes.appContent}>
        <Outlet />
      </div>
      <FooterContainer />
    </div>
  );
};

export default AppLayout;
