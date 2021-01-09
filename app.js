const express = require('express')
var bodyParser = require('body-parser')
const app = express()
var mqtt = require('mqtt')

var options = {
    username: '*****',
    password: '*****',
    port: 1883
}



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.post('/', async (req, res) => {

    let command = ""
    // console.log(req.body)
    if (req.body.queryResult.intent.displayName === "light-intent") {
        command = req.body.queryResult.parameters["light-command"]
        console.log(`===========Command is to turn ${command} the light===========`)
        var client  = mqtt.connect('mqtt://maqiatto.com', options)
        client.publish('*****.com/ramukaka', command)
    }
    let resText = `Going to turn ${command} the light`
    res.json({
        "fulfillmentMessages": [
            {
                "text": {
                    "text": [
                        resText
                    ]
                }
            }
        ]
    })
})

app.listen(process.env.PORT)
