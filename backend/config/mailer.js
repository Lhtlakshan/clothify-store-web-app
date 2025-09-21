import nodemailer from "nodemailer";

let transporter;

if (process.env.ETHEREAL_USER && process.env.ETHEREAL_PASS) {
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASS,
    },
  });
} else {
    
  // Console fallback transporter so your app doesn't crash without Ethereal
  transporter = {
    sendMail: async (mailOptions) => {
      console.log("----- EMAIL (console fallback) -----");
      console.log("To:", mailOptions.to);
      console.log("Subject:", mailOptions.subject);
      console.log("HTML:", mailOptions.html);
      console.log("------------------------------------");
      return { messageId: "console-fallback" };
    },
  };
}

export default transporter;
