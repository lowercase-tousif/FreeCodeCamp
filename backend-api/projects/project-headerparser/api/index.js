const serverless = require("serverless-http");
const app = require("../index"); // Import your existing Express app

module.exports.handler = serverless(app); // Export for Vercel
module.exports = app;
