import { useEffect, useState, useRef, MutableRefObject } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const useIntersectionObserver = <T extends HTMLElement>(
  options: IntersectionObserverOptions
): [MutableRefObject<T | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
        observer.disconnect();
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};

export default useIntersectionObserver;
