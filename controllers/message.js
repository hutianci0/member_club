import { Msg } from "../db/msgModel.js"
export const renderMsg = (req, res) => {
  const id = req.params.id
  const isAuthenticated = req.isAuthenticated() || false
  const user = req.user || {}
  isAuthenticated ? res.render('message', { id, user, isAuthenticated }) : res.send('you need to login')
}



export const handleMsg = async (req, res) => {


  const userID = req.user.id
  // const reqID = req.params.msgID

  // if (userID != reqID) {
  //   return res.send('Test id ')
  // }

  const { title, content } = req.body
  const { fullname: author } = req.user

  await Msg.create({ title, content, author, userID })

  res.redirect('/main/' + userID)
}

export const delMsg = async (req, res) => {
  try {
    await Msg.destroy({ where: { id: req.params.msgID } })
    res.redirect('/main/' + req.user.id)
  } catch (error) {
    console.log(error)
  }



}