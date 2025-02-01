import { body, validationResult } from 'express-validator'
import { User } from '../db/userModel.js'

export const validationRules = () => [
  // first_name: Not empty, trimmed, length between 1-10 characters, alphabetic
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 1, max: 10 }).withMessage('First name must be between 1-10 characters')
    .isAlpha().withMessage('First name must be alphabetic'),

  // surname: Not empty, trimmed, length between 1-10 characters, alphabetic
  body('surname')
    .trim()
    .notEmpty().withMessage('Surname is required')
    .isAlpha().withMessage('Surname must be alphabetic')
    .isLength({ min: 1, max: 10 }).withMessage('Surname must be between 1-10 characters'),

  // username: Must be a valid email
  body('username')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email'),

  // password: Not empty, length between 6-12 characters
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 12 }).withMessage('Password must be between 6-12 characters'),

  // passwordConfirmation: Must match the password
  body('repassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
]


export const handleSignUp = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).render('index', { errors: errors.array() })
  }


  const { username, first_name, surname, password } = req.body
  const fullname = first_name + ' ' + surname

  // more logic( authentication, membership, admin goes here)
  // Insert new user:
  // 1. password hashed (User hooks)
  // 2. Unique username: 'SequelizeUniqueConstraintError'
  // 3. other errors
  try {
    await User.create({ username, fullname, password })
  } catch (error) {
    // console.log(error)
    if (error.name === "SequelizeUniqueConstraintError") {
      // 这里修改errors的类型与上面一致 : [{msg: "XXX"}]
      return res.status(400).render('index', { errors: [{ msg: error.errors[0].message }] })
    } else {
      return res.status(400).render('index', { errors: [{ msg: 'unexpected error' }] })

    }

  }
  res.redirect('/login')

}


export const validateMsg = () => [
  body('title').trim().notEmpty().withMessage('title is required').isLength({ min: 1, max: 10 }).withMessage('title length 1-10'),
  body('content').trim().notEmpty().withMessage('title is required').isLength({ min: 1, max: 20 }).withMessage('content length 1-20'),
]

export const handleMsgValidation = (req, res, next) => {
  if (!req.isAuthenticated()) res.redirect('/login')
  const errors = validationResult(req)
  const user = req.user
  if (!errors.isEmpty()) {
    return res.status(400).render('message', { errors: errors.array(), isAuthenticated: req.isAuthenticated(), user })
  }

  next()

}