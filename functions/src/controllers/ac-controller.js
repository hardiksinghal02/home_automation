const restController = require("./rest-controller")


const ADAFRUIT_HOST = "io.adafruit.com"
const ADAFRUIT_WEBHOOK_PATH = "/api/v2/webhooks/feed/9NRuGC4GYpLXuT2ghSpVsrizRnqa"
const headers = {
    "Content-Type": "application/json"
}

const map = {
    "ON" : 25,
    "OFF" : 0,
    "16" : 16,
    "17" : 17,
    "18" : 18,
    "19" : 19,
    "20" : 20,
    "21" : 21,
    "22" : 22,
    "23" : 23,
    "24" : 24,
    "25" : 25,
    "26" : 26,
    "27" : 27,
    "28" : 28,
    "29" : 29,
    "30" : 30,
}


const sendSignal = async (input) => {
    var signal = map[input.toUpperCase()];
    console.log(signal);
    payload = {
        'value' : signal
    }
    const resp = await restController.sendPostRequest(ADAFRUIT_HOST, ADAFRUIT_WEBHOOK_PATH, payload, headers)
    if (resp.statusCode == 200 || resp.statusCode == 204) {

        
        return resp.responseString
    }
    console.error(resp)
    return "resp.statusCode"
}


// const getAllTasks = (callBackFunction) => {
//     return restController.sendGetRequest(TODOIST_HOST, TODOIST_TASK_ENDPOINT, headers)
//         .then(resp => {
//             if(resp.statusCode == 200) {
//                 try {
//                     return JSON.parse(resp.responseString)
//                 } catch(e) {
//                     console.error("Can't convert to json : " + resp.responseString);
//                     return resp.responseString;
//                 }
//             }
//             throw resp.responseString;
//         })
// }

// const markTaskAsCompleted = (taskId) => {
//     const endpoint = TODOIST_TASK_ENDPOINT + taskId + "/close"
//     return restController.sendPostRequest(TODOIST_HOST, endpoint, {}, headers).then(resp => {
//         if(resp.statusCode == 200 || resp.statusCode == 204) {
//             return resp.responseString
//         }
//         throw resp.responseString;
//     })
// }

module.exports = {
    sendSignal : sendSignal
}