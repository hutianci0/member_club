import { Msg } from '../db/msgModel.js'

export const renderMain = async (req, res) => {
  const isAuthenticated = req.isAuthenticated()
  const user = req.user || {}
  const msgList = await Msg.findAll()

  // const msgList = List.map(item => {
  //   item.createdAt = formatTime(item.createdAt)
  //   return item
  // })


  res.render('main', { msgList, isAuthenticated, user })

}