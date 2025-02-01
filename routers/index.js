import { Router } from "express";
import { getIndex, handleSignUp, validationRules, handleLogin, renderMain, renderMsg, handleMsg, handleMsgValidation, validateMsg, renderProfile, delMsg, } from "../controllers/index.js";
const router = Router()

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/main/' + req.user.id);
};




// sign up page
router.get('/', getIndex)
// validate sign up
router.post('/sign_up', validationRules(), handleSignUp)

// render login page
router.get('/login', (req, res) => {
  const message = [{ msg: req.session.messages }] || []
  req.session.messages = [];
  res.render('login', { errors: message })
}

)

// login authentication
router.post('/login/password', handleLogin, (req, res) => { res.redirect(`/main/${req.user.id}`) })


// render main page
router.get('/main/:id?', renderMain)
// render message board
router.get('/msgBoard/:id', renderMsg)
// post msg
router.post('/msgBoard/postMsg/:id', validateMsg(), handleMsgValidation, handleMsg)

// logout
router.get('/logout', (req, res) => {
  req.logout((error) => {
    error ? next(error) : res.redirect('/login')
  })
})

// render profile page
router.get('/profile', renderProfile)

// handle delete (single)
router.post('/delete/:msgID', ensureAuthenticated, delMsg)

export { router }