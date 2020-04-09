export default function({ isHMR, app, store, route, error, redirect }) {
  let getAuth = localStorage.getItem("AUTH"); //get the data from sessionStorage
  let buffDecode = new Buffer(getAuth, "base64"); // decode the data from sessionStorage
  let authData = buffDecode.toString("ascii"); //convert data to normal data
  if (Object.keys(authData).length > 1) {
    // check data is not empty before send to center data
    store.commit("setAuth", authData); // if the value is not empty, let's send it
  }
}
