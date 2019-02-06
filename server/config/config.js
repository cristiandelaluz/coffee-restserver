// ==========================
//  Port
// ==========================
process.env.PORT = process.env.PORT || 3000;

// ==========================
//  Env
// ==========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ==========================
//  DB
// ==========================
let mongoUrl;

if (process.env.NODE_ENV === 'dev') {
  mongoUrl = 'mongodb://localhost:27017/coffee';
} else {
  mongoUrl = 'mongodb://coffee-user:delaluz8@ds163164.mlab.com:63164/coffee';
}

process.env.mongoUrl = mongoUrl;
