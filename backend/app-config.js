const env = process.env;

const appConfig = {
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER ,
    password: env.DB_PASSWORD,
    database: env.DB_NAME ,
  },
  uiRowsPerPage: 10,
};

module.exports = appConfig;