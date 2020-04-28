import axios from "axios";
import config from "../config/config.global";

// Global Roarr function
globalThis.ROARR = globalThis.ROARR || {};

// Send log to the server
globalThis.ROARR.write = (message) => {
    axios.post(config.logDomain, JSON.parse(message)).then((done) => {

    }).catch((e) => console.log(e));
}