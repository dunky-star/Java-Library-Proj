export const oktaConfig = {
  clientId: "0oak81vs1qWfsH1dD5d7",
  issuer: "https://dev-04665306.okta.com/oauth2/default",
  redirectUri: "http://localhost:5173/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsChecks: true,
};
