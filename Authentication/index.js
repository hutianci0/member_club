import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../db/userModel.js'
import bcrypt from 'bcryptjs'

const AuthRules = () =>
  new Strategy(
    {
      usernameField: 'username', // 指定请求中用户名字段的名称
      passwordField: 'password', // 指定请求中密码字段的名称
    },
    async (username, password, done) => {

      try {
        const user = await User.findOne({ where: { username } })
        // incorrect username
        if (!user) {
          return done(null, false, { message: 'incorrect username' })
        }
        // incorrect password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return done(null, false, { message: 'incorrect password' })
        }
        // correct
        return done(null, user)
      } catch (error) {
        return done(error)
      }

    })

//  user and its id
passport.serializeUser((user, done) => done(null, user.id));

// query user by id
passport.deserializeUser(async (id, done) => {
  const user = await User.findByPk(id);
  done(null, user);
});


passport.use('local', AuthRules())

export { passport }