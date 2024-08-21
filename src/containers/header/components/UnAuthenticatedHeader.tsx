import UnAuthenticatedHeaderUI from "@/components/header/components/UnAuthenticatedHeaderUI/UnAuthenticatedHeaderUI";

const UnAuthentificatedHeader: React.FC<{ login: () => void; signUp: () => void }> = ({ login, signUp }) => {
  return <UnAuthenticatedHeaderUI login={login} signUp={signUp} />;
};

export default UnAuthentificatedHeader;
