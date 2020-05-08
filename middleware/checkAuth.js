import secureStorage from "../plugins/secure-storage";

export default function({ query, store, redirect }) {
  const referrerURL = secureStorage.getItem("referrerURL");
  if (referrerURL == undefined) {
    secureStorage.setItem("referrerURL", "159.138.130.64");
  }
  if (Object.keys(query).length !== 0) {
    let messageError = [];
    if (!query.portalProviderUUID) {
      const error = "portalProviderUUID field is Missing";
      messageError.push(error);
    } else if (!query.portalProviderUserID) {
      const error = "portalProviderUserID field is Missing";
      messageError.push(error);
    } else if (!query.balance) {
      const error = "balance field is Missing";
      messageError.push(error);
    } else if (!referrerURL) {
      const error = "Reference URL missing";
      messageError.push(error);
    } else {
      const UserAuth = {
        portalProviderUUID: query.portalProviderUUID,
        portalProviderUserID: query.portalProviderUserID,
        version: "0.1",
        ip: "225.457.454.123",
        domain: referrerURL,
        balance: query.balance
      };
      secureStorage.setItem("PORTAL_PROVIDERUUID", query.portalProviderUUID);
      store.dispatch("setUserAuth", UserAuth);
      store.dispatch("setPortalProviderUUID", UserAuth.portalProviderUUID);
    }
    store.dispatch("setUserAuthError", query.messageError);
  } else {
    redirect(referrerURL);
    secureStorage.removeItem("referrerURL");
  }
}
