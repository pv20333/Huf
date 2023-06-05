module.exports = {
  HOST: "localhost",
  PORT: "1433",
  USER: "sa",
  PASSWORD: "yourStrong(!)Password",
  DB: "huf10",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
