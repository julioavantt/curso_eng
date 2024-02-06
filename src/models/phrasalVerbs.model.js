import { Model, DataTypes } from "sequelize";

import { sequelize } from "./connection.js";

class PhrasalVerb extends Model {}

PhrasalVerb.init(
 {
  id_phrasal_verb: {
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
  modelName: "PhrasalVerb",
 }
);

export default PhrasalVerb;
