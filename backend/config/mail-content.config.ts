

export function otpVerificationContent(
  OTP_EXPIRATION_MINUTES: number,
  otpCode: string,
) {
  return `
    <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
      Xin chào,
    </p>
    <p style="font-size: 15px; color: #555; margin-bottom: 20px;">
      Cảm ơn bạn đã đăng ký tài khoản tại <strong>Online Auction</strong>. 
      Để hoàn tất quá trình đăng ký, vui lòng sử dụng mã OTP bên dưới:
    </p>
    <div class="highlight">
      ${otpCode}
    </div>
    <p style="font-size: 14px; color: #e74c3c; margin-top: 20px;">
      ⏰ Mã OTP có hiệu lực trong <strong>${OTP_EXPIRATION_MINUTES} phút</strong>
    </p>
    <p style="font-size: 14px; color: #555; margin-top: 15px;">
      ⚠️ <strong>Lưu ý:</strong> Vui lòng không chia sẻ mã OTP này với bất kỳ ai để bảo vệ tài khoản của bạn.
    </p>
  `;
}
