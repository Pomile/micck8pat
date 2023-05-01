import fs from 'fs';
import path from 'path';
import { Sequelize, DataType } from 'sequelize-typescript';
import denv from 'dotenv';
import dbConfig from '../../config/database';

denv.config();
type db = {
  sequelize?: any,
  Sequelize?: any
}
const env = process.env.NODE_ENV || 'development';

const conf: any = dbConfig;
const config:any = conf[env]

const db: any  = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const modulesPath = path.join(__dirname, "../../modules")
fs.readdirSync(modulesPath).forEach(mod => {
    const modulePath = path.join(modulesPath, mod);
    fs
    .readdirSync(modulePath)
    .filter(file => (file.indexOf('.') !== 0) && (file.includes('model')) && (file.slice(-3) === '.js'))
    .forEach((file) => {
      const model = require(path.join(modulePath, file))(sequelize, DataType);
      db[model.name] = model;
    });
 });
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
