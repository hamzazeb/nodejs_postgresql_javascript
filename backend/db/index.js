const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "aibershealth",
  host: "localhost",
  port: 5432,
  database: "lpp",
});

module.exports = {
  pool,
}
