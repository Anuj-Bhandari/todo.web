require('dotenv').config(); 

module.exports = {
  secretkey: process.env.SECRET_KEY,
  mongoUrl: process.env.MONGO_URL,
  port: process.env.PORT,
};
