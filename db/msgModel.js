import { sequelize } from "./createDB.js";
import { DataTypes } from "sequelize";


// define user table
const Msg = sequelize.define("Msg", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  userID: { type: DataTypes.INTEGER, references: { model: 'User', key: 'id' }, onDelete: 'SET NULL', onUpdate: 'CASCADE' }
}, { freezeTableName: true }
)



// await Msg.create({ title: 'test', content: 'this is test message', author: 'Tianci Hu', userID: '1' })

await Msg.sync({ alter: true })

export { Msg }