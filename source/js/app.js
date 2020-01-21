const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const fs = require("fs")
const config = require("./config")

const server = express()
server.set("source", path.join(_dirname, config.source))
server.set("source engine", "pug")

server.use(express.static(path.join(process.cwd(), config.public)))

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(cookieParser())
server.use(session({
  resave: true,
  saveUninitialised: true,
  secret: "login",
  cookie: {
    maxAge: 60000
  }
}))
server.use(session({
  secret: "mail",
  saveUninitialised: true,
  resave: true
}))

server.use(flash())
server.use("/", require("./routes/index"))