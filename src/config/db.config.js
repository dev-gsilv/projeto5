const { DB_NAME, DB_USER, DB_HOST, DB_PASS } = process.env;

const dbConfig = {
    HOST: DB_HOST,
    USER: DB_USER,
    PASSWORD: DB_PASS,
    DB: DB_NAME,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  
  export default dbConfig;
  