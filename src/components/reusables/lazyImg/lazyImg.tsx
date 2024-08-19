import React, { useEffect } from "react";

// ** hooks
import useIntersectionObserver from "@/hooks/useResponsive/useIntersectionObserver";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src = "", alt, className, onClick, ...restProps }) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLImageElement>({});

  useEffect(() => {
    if (isVisible && ref.current) ref.current.src = src;
  }, [src, isVisible]);

  return <img className={className} ref={ref} alt={alt} onClick={onClick} {...restProps} />;
};

export default LazyImage;
