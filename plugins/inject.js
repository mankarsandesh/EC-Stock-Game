import Vue from 'vue'

const resultEvent = {
    name: 'resultEvent',
    result(result, stockName, betID, betWin) {
        const lastDraw = result.substr(result.length - 2); //get the last two digit
        const first = parseInt(lastDraw.slice(0, 1)); // get the first digit number  
        const last = parseInt(lastDraw.slice(1, 2)); // get the last digit number 
        const bothDigit = first + last; // get the both digit number 
        const twoDigit = lastDraw.slice(0, 1) + lastDraw.slice(1, 2); // git the two digit number 
        console.log('Hi am here', twoDigit)
        this.$emit("vongkeo", twoDigit);
    },
    betButton(val) {
        alert(val)
    }
}

Vue.prototype.$resultEvent = resultEvent