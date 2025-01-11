const mongoose = require('mongoose');

const connectDB = () => {
  
  return mongoose
    .connect(`mongodb://127.0.0.1:27017/FinancialData`)
    .then(() => console.log('Connected to FinancialData'))
    .catch((error) => console.log(error));
};

module.exports = connectDB;