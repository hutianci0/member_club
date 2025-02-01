import { sequelize } from "./createDB.js";
import { User } from "./userModel.js";
import { Msg } from "./msgModel.js";

User.hasMany(Msg, { foreignKey: 'userID' })
Msg.belongsTo(User)

// try {
//   await sequelize.sync({ force: true })
//   console.log('syc successfully');



// } catch (error) {
//   console.log("failed to sync :", error);

// }

