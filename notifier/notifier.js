const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const notifier = require("node-notifier")

const app = express()
const PORT = process.env.PORT || 9000

app.use(bodyParser.json())

app.get("/health", (req, res) => res.status(200).send())
app.post("/notify", (req, res) => {
    notify(req.body, reply => res.send(reply))
})

app.listen(PORT, () => console.log(`App is running on port : ${PORT}`))

const notify = ({title, message}, cb) => {
    notifier.notify(
        {
            title: title || "Unknown title",
            message: message || "Unknown message",
            //icon: path.join(__dirname, "img.jpg"),
            sound: true, 
            wait: true, 
            reply: true,
            closeLable: "Completed",
            timeout: 15
        },
        (err, response, reply) => {
            cb(reply)
        }
    )
}
