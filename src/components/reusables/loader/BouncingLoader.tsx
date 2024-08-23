import BouncingLoaderGif from "@/assets/image/common/bouncingLoader.gif";
import classes from "./bouncingLoader.module.scss";

const BouncingLoader = () => {
  return <img className={classes.bouncingLoader} src={BouncingLoaderGif} alt="loading" />;
};

export default BouncingLoader;
