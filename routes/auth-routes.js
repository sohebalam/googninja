import Router from "express"
import passport from "passport"

const authRouter = Router()
// auth login
authRouter.get("/login", (req, res) => {
  res.render("login", { user: req.user })
})

// auth logout
authRouter.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/")
})

// auth with google+
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
)

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("/profile")
  }
)

export default authRouter