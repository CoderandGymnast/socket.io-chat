var app = require("express")() /** Function handler. */
var http = require("http").createServer(app) /** HTTP server. */
var io = require("socket.io")(http)

app.get("/", (request, response) => { /** Route handler. */
    response.sendFile(__dirname + "/index.html")
})

io.on("connection", (socket) => { /** Listent on "connection" event. */
    console.log("a user connected")
    socket.on("chat message", (m) => {
        io.emit("chat message", m)
        // socket.broadcast.emit("chat message", m) /** Send a message to everyone except for a certain emitting socket (The sender). */
    })
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
})

http.listen(3000, () => {
    console.log("listening on *:3000")
})