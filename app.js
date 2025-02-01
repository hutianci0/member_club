import express from 'express'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { router } from './routers/index.js'
import { passport } from './Authentication/index.js'
import session from 'express-session'
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set('view engine', 'ejs')
app.set('views', join(__dirname + '/views'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(join(__dirname, 'public')))
app.use(session({ secret: 'cats', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use(router)

//静态资源?




const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('app is running at 8080.....'))
