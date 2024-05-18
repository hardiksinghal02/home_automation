const express = require("express")

const router = express.Router()
const acController = require("../controllers/ac-controller")

router.post("/ac/send", (req, res, next) => {
    
    console.log(req.body)

    if(typeof req.body.value == 'undefined') {
        res.send("ERROR")
        return
    }

    const value = req.body.value
    console.log("Trigger hit with command : " + value)

    acController.sendSignal(value).then(resp => {
        res.send(resp)
    })
})

module.exports = router