const { Sequelize } = require("sequelize");

let sequelize;

if (process.env.JAWDB_URL) {
  sequelize = new Sequelize (process.env.JAWDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.BD_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect:'mysql',
      port:3306,
    },
  );
}