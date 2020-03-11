export default function ({ isHMR, app, store, route, error, redirect }) {

    let getAuth = sessionStorage.getItem("AUTH")  //get the data from sessionStorage
    let buffDecode = new Buffer(getAuth, "base64"); // decode the data from sessionStorage 
    let authData = buffDecode.toString("ascii"); //convert data to normal data 
    if (authData) { // check data is not empty before send to center data 
        store.commit("setAuth", authData)  // if the value is not empty, let's send it 
    }




    /* ---------------------------- ABOUT MIDDLEWARE ---------------------------- */
    //  This middleware is should be in the global path, 
    // so in this case we push in the the 
    //  nuxt.config.js, nuxt.config.js is the global config,

    /* --------- if you need to understand more, please contact Vong -------- */

    /* --------------------------------- the end -------------------------------- */

}
