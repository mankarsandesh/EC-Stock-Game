export default function ({ query, store, redirect }) {
  const referrerURL = localStorage.getItem("referrerURL")
  if (referrerURL == undefined) {
    localStorage.setItem("referrerURL", document.referrer.match(/:\/\/(.[^/]+)/)[1]);
  }
  if (Object.keys(query).length !== 0) {
    let messageError = []
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
      const error = "Something Wrong.";
      messageError.push(error);
    } else {
      const UserAuth = {
        portalProviderUUID: query.portalProviderUUID,
        portalProviderUserID: query.portalProviderUserID,
        version: "0.1",
        ip: "225.457.454.123",
        domain: referrerURL,
        balance: query.balance,
      }
      localStorage.setItem(
        "PORTAL_PROVIDERUUID",
        query.portalProviderUUID
      );
      store.commit("SET_USER_AUTH", UserAuth)
      store.dispatch("setPortalProviderUUID", UserAuth)
    }
    store.commit("SET_USER_AUTH_ERROR", query.messageError)

  } else {
    redirect(referrerURL)
    localStorage.removeItem("referrerURL")

  }
}
