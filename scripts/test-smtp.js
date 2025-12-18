// node scripts/test-smtp.js
require("dotenv").config();
const nodemailer = require("nodemailer");

(async () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  try {
    await transporter.verify();
    console.log("SMTP verified — credentials OK.");
  } catch (err) {
    console.error("SMTP verify failed:", err && err.message ? err.message : err);
  }
})();
