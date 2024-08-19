import { useMediaQuery } from "usehooks-ts";
import { useResponsiveI } from "./types";

export const useMobile = () => {
  return useMediaQuery("(max-width:549px)");
};

export const useTablet = () => {
  return useMediaQuery("(min-width:744px)");
};

export const useLaptop = () => {
  return useMediaQuery("(min-width:1024px)");
};

export const useDesktop = () => {
  return useMediaQuery("(min-width:1366px)");
};

export const useResponsive = <T>(data: useResponsiveI<T>): T => {
  const { mobile, tablet, laptop, desktop } = data;
  const isDesktop = useDesktop();
  const isLaptop = useLaptop();
  const isTablet = useTablet();
  // const isTabletSmall = useTabletSmall();

  if (desktop && isDesktop) {
    return desktop;
  }
  if (laptop && isLaptop) {
    return laptop;
  }

  if (tablet && isTablet) {
    return tablet;
  }

  // if (tabletSmall && isTabletSmall) {
  //   return tabletSmall;
  // }

  return mobile;
};
