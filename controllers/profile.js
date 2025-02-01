export const renderProfile = (req, res) => {
  const user = req.user
  const isAuthenticated = req.isAuthenticated()

  isAuthenticated ? res.render('profile', { isAuthenticated, user }) : res.redirect('/login')

}