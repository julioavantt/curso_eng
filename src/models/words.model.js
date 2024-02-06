import { Model, DataTypes } from "sequelize";

import { sequelize } from "./connection.js";

class Word extends Model {}

Word.init(
 {
  id_word: {
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
  modelName: "Word",
 }
);

export default Word;
