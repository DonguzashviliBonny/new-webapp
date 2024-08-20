// ** service
import { useFooterContentReq } from "@/api/requests/layout";

// ** components
import FooterUI from "@/components/footer/FooterUI";
import { FooterSkeleton } from "@/components/footer/Footer-skeleton";

const FooterContainer = () => {
  const { data } = useFooterContentReq();

  if (!data) return <FooterSkeleton />;
  return <FooterUI data={data} />;
};

export default FooterContainer;
