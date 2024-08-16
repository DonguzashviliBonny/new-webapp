import { StrapiT, StrapiImageT } from "../common";

export interface AuthenticatedFooterProps {
  data: StrapiT<{ Name: string; Image: StrapiImageT }>[];
}
