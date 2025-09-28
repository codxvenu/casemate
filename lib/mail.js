// sendMail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: "vasulallu09@gmail.com",       // your Gmail address
    pass: "pjji ehue akly sbhe",  // 16-char App Password
  },
});

export async function sendEmail(to, subject, html) {
  const info = await transporter.sendMail({
    from: "vasulallu09@gmail.com",
    to,
    subject,
    html,
  });
  return info;
}
export default sendEmail;
