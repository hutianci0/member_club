import { sequelize } from "./createDB.js";
import { DataTypes } from "sequelize";
import bycrypt from 'bcryptjs'


// define user table
const User = sequelize.define("User", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  fullname: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  membership: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }

}, { freezeTableName: true }
)

// use hooks to encrypt
const generateHash = async (user) => {
  if (user === null) {
    throw new Error('user not found')
  } else if (!user.changed('password')) {
    return user.password

  } else {

    const salt = await bycrypt.genSalt(10)
    return user.password = await bycrypt.hash(user.password, salt)

  }
}

User.beforeCreate(generateHash)
User.beforeUpdate(generateHash)

await User.sync({ alter: true })



export { User }