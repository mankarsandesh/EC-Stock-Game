import secureStorage from "../plugins/secure-storage";
import config from "../config/config.global";

export default function({ query, store, redirect }) {
  const referrerURL = secureStorage.getItem("referrerURL");
  if (referrerURL == undefined) {
    secureStorage.setItem(
      "referrerURL",
      config.Whitelabel.url
    );
  }
}
