import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config()
const env = process.env


const sequelize = new Sequelize(env.db, env.username, env.password, {
  dialect: 'postgres',
  host: env.host,
  port: env.port

})

try {
  await sequelize.authenticate();
  console.log(`Connection has been established at db:${env.db}.`);
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export { sequelize }