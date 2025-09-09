require('dotenv').config();

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;

console.log("Admin:", ADMIN_USER); // juste pour tester
console.log("Pass:", ADMIN_PASS ? "******" : "NOT SET"); // juste pour tester