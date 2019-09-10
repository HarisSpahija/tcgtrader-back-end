require("dotenv").config();
const pgPromise = require("pg-promise");

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
  host: "localhost",
  port: 5432,
  database: "examplemtg",
  user: "postgres",
  password: "postgres"
};

const db = pgp(config);

exports.db = db;

db.one("select * from users").then(res => {
    console.log(res);
  });
