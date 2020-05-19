import config from "../config/config.global";

export default function(context) {
  if (config.isMaintenance == "true") {
    return context.redirect("/maintenance");
  }
  return;
}
