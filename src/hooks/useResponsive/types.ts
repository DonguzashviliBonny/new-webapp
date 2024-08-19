export interface useResponsiveI<T> {
  mobile: T;
  tablet?: T;
  laptop?: T;
  desktop?: T;
}
