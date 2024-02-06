import { Model, DataTypes } from "sequelize";

import { sequelize } from "./connection.js";

class Phrase extends Model {}

Phrase.init(
 {
  id_phrase: {
   type: DataTypes.UUID,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
  },
  en: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  es: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  points: {
   type: DataTypes.INTEGER,
   allowNull: false,
   defaultValue: 0,
  },
 },
 {
  sequelize,
  modelName: "Phrase",
 }
);

export default Phrase;
