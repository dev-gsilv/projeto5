const dbConfig = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "@xM&Hr#4g8FU4cVp",
    DB: "tugasapiDB",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  };
  
  export default dbConfig;
  