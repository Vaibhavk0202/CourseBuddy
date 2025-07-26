const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    // Validate required environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      throw new Error("Missing required SMTP environment variables");
    }

    // Validate input parameters
    if (!email || !title || !body) {
      throw new Error("Missing required parameters: email, title, or body");
    }

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Send email
    let info = await transporter.sendMail({
      from: `"CourseBuddy" <${process.env.SMTP_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    // Return success response
    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }
};

module.exports = mailSender;
