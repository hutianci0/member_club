import passport from "passport"
export const getIndex = (req, res) => {
  res.render('index')
}


export const handleLogin = passport.authenticate('local', {
  failureRedirect: '/login',
  failureMessage: true,
  // successRedirect: "/main"
})
