import Vue from 'vue'

Vue.filter('lastDraw', (value) => {
    if (!value) return ''
    value = value.toString()
    let f = value[value.length - 2];
    let l = value[value.length - 1];
    let newS2 = value.substring(0, value.length - 2);
    let result = `${newS2}<span style="color:#ce3b6a;font-weight: bold;">${f}${l}</span>`;
    return result
})
Vue.filter('currency', (value, decimalCount = 2) => {
    if (!value) return ''
    return formatMoney(value, decimalCount)
})

Vue.filter('betclosein', (value, loop) => {
    if (!value || !loop) return ''
    if (value == "close") return "MARKET CLOSE"
    let result = ""
        // for  loop 1 
    if (loop == 1) {
        // bet close
        if (value > 40) {
            result = "Calculating"
        } else {
            result = "00:" + appendHero(value)
        }
    }
    // for loop 5 
    else {
        // bet close
        if (value > 240) {
            result = "Calculating"
        } else {
            // let mm = "0" + parseInt(value / 60)
            // let ss = value % 60
            // result = mm + ":" + appendHero(ss)
            result = changeNumberToTime(value)
        }
    }
    return result
})
Vue.filter('lotterydraw', (value, loop) => {
    if (!value | !loop) return ''
    if (value == "close") return ""
    let result = ""
    if (loop == 1) {
        if (value > 40) {
            value = value + 40 - 80
        } else {
            value = value + 20
        }
        result = "00:" + appendHero(value)
    } else {
        if (value > 240) {
            value = value + 60 - 300
        } else {
            value = value + 60
        }
        result = changeNumberToTime(value)
    }
    return result
})
Vue.filter('betstatus', (value, loop) => {
    if (!value | !loop) return ''
    if (value === "close") return "close"
    let result = "error"
    if (loop == 1) {
        if (value > 40) {
            result = "calculating"
        } else {
            result = "accepting"
        }
    } else if (loop == 5) {
        if (value > 240) {
            result = "calculating"
        } else {
            result = "accepting"
        }
    }
    return result
})

function changeNumberToTime(value) {
    let result = ""
    let mm = "0" + parseInt(value / 60)
    let ss = value % 60
    result = mm + ":" + appendHero(ss)
    return result
}

function appendHero(value) {
    let result = ""
    if (value < 10) {
        result = "0" + value
    } else {
        result = value
    }
    return result
}

function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};
Vue.filter('livePriceColor', (current, previous) => {
    if (!current) return ''
    let result = ""
    if (parseFloat(current) > parseFloat(previous)) {
        result = `<span style="color:red">${current}</span>`
    } else {
        result = `<span style="color:green">${current}</span>`

    }
    return result

})