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
  mongoUrl = process.env.MONGO_URI;
}

process.env.mongoUrl = mongoUrl;
