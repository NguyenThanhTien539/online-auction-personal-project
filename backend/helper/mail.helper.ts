import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use false for STARTTLS; true for SSL on port 465
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Template HTML cho email
const getEmailTemplate = (title: string, content: string) => {
  return `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f7fa;
          padding: 20px;
          line-height: 1.6;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 30px;
          text-align: center;
          color: #ffffff;
        }
        .email-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .logo {
          width: 60px;
          height: 60px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          margin-bottom: 15px;
          backdrop-filter: blur(10px);
        }
        .email-body {
          padding: 40px 30px;
          color: #333333;
        }
        .email-body h2 {
          color: #667eea;
          font-size: 22px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .content-box {
          background-color: #f8f9fc;
          border-left: 4px solid #667eea;
          padding: 20px;
          margin: 20px 0;
          border-radius: 6px;
        }
        .content-text {
          font-size: 15px;
          color: #555555;
          margin-bottom: 15px;
        }
        .highlight {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 25px;
          border-radius: 8px;
          text-align: center;
          font-size: 18px;
          font-weight: 600;
          margin: 25px 0;
          letter-spacing: 2px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        .button {
          display: inline-block;
          padding: 14px 35px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          transition: transform 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
        .email-footer {
          background-color: #f8f9fc;
          padding: 30px;
          text-align: center;
          color: #777777;
          font-size: 13px;
          border-top: 1px solid #e5e7eb;
        }
        .email-footer p {
          margin-bottom: 8px;
        }
        .social-links {
          margin: 20px 0;
        }
        .social-links a {
          display: inline-block;
          margin: 0 8px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
        }
        .divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #667eea, transparent);
          margin: 25px 0;
        }
        @media only screen and (max-width: 600px) {
          .email-body {
            padding: 30px 20px;
          }
          .email-header {
            padding: 30px 20px;
          }
          .email-header h1 {
            font-size: 24px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <div class="logo">🔨</div>
          <h1>Online Auction</h1>
          <p style="opacity: 0.9; font-size: 14px;">Nền tảng đấu giá trực tuyến uy tín</p>
        </div>
        
        <div class="email-body">
          <h2>${title}</h2>
          <div class="divider"></div>
          
          <div class="content-box">
            <div class="content-text">
              ${content}
            </div>
          </div>
          
          <p class="content-text">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại hỗ trợ.
          </p>
          
          <div style="text-align: center;">
            <a href="#" class="button">Truy cập website</a>
          </div>
        </div>
        
        <div class="email-footer">
          <p><strong>Online Auction</strong></p>
          <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP. HCM</p>
          <p>Email: support@onlineauction.com | Hotline: 1900-xxxx</p>
          
          <div class="social-links">
            <a href="#">Facebook</a> |
            <a href="#">Twitter</a> |
            <a href="#">Instagram</a>
          </div>
          
          <div class="divider"></div>
          
          <p style="font-size: 11px; color: #999;">
            Email này được gửi tự động. Vui lòng không trả lời email này.<br>
            © ${new Date().getFullYear()} Online Auction. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const sendMail = async (
  email: string,
  title: string,
  content: string,
) => {
  try {
    const htmlContent = getEmailTemplate(title, content);

    const mailOptions = {
      from: `"Online Auction" <${process.env.GMAIL_ADDRESS}>`,
      to: email,
      subject: title,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
