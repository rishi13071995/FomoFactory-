
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const app = express()

require("dotenv").config()

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'api_key'],
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))

const restRoutes = require("./routes/rest")

app.use(`/api/${process.env.API_VERSION}`, restRoutes)

if(process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== "development") {
    app.use(helmet())
}

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(morgan("dev"))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: false }))


// app.set('view engine', 'ejs');

// app.use((req, res, next)=> {
//     next(createError(404))
// })

app.use((err, req, res, next)=> {
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    res.status(err.status || 500)
    res.render("error")
})

module.exports = app
