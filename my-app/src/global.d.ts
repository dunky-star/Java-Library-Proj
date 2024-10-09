declare module "*.jsx" {
  import { FunctionComponent } from "react";

  interface OktaConfig {
    clientId: string;
    issuer: string;
    redirectUri: string;
    scopes: string[];
    pkce: boolean;
    disableHttpsChecks: boolean;
  }

  const component: FunctionComponent<{ config: OktaConfig }>;
  export default component;
}
