import express from "express"
import cookieSession from "cookie-session"
import passport from "passport"
import authRoutes from "./routes/auth-routes.js"
import profileRoutes from "./routes/profile-routes.js"
import passportSetup from "./config/passport-setup.js"
import mongoose from "mongoose"
// import keys from "./config/keys.js"

const app = express()

// set view engine
app.set("view engine", "ejs")

// set up session cookies
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["authnew"],
  })
)

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/OAUTH", () => {
  console.log("connected to mongodb")
})

// set up routes
app.use("/auth", authRoutes)
app.use("/profile", profileRoutes)

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user })
})

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000")
})
