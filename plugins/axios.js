import LoggerService from "../services/logger_service";
const reqLogger = new LoggerService("request");

export default function({ $axios, redirect }) {
  $axios.onRequest(config => {
    reqLogger.info(` | config.url`);
    console.log("Making request to " + config.url);
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    console.log("error agyaaaaa", error.response);
  });

  $axios.onResponse(response => {
    console.log("respoonse aya", response);
  });
}
