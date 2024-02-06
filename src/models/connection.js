import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("eng", "root", "123456", {
 host: "localhost",
 dialect: "mysql",
 port: 3306,
});
