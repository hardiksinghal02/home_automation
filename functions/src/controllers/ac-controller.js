const restController = require("./rest-controller")


const ADAFRUIT_HOST = "io.adafruit.com"
const ADAFRUIT_WEBHOOK_PATH = "/api/v2/webhooks/feed/9NRuGC4GYpLXuT2ghSpVsrizRnqa"
const headers = {
    "Content-Type": "application/json"
}

const map = {
    "ON" : 1,
    "OFF" : 2
}


const sendSignal = (input) => {
    var signal = map[input.toUpperCase()];
    console.log(signal);
    payload = {
        'value' : signal
    }
    return restController.sendPostRequest(ADAFRUIT_HOST, ADAFRUIT_WEBHOOK_PATH, payload, headers)
    
    .then(resp => {
        if(resp.statusCode == 200 || resp.statusCode == 204) {
            return resp.responseString
        }
        console.error(resp)
        return "resp.statusCode";
    })
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