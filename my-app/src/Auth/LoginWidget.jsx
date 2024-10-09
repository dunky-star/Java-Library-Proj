import { useOktaAuth } from "@okta/okta-react";
import { Navigate } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";
import { SpinnerLoading } from "../layouts/utils/SpinnerLoading";

const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  if (!authState || authState.isPending) {
    return <SpinnerLoading />;
  }

  if (authState.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
