export const createEmailOtpContent = (otp: string): string => {
  return `
    Mã OTP của bạn là: ${otp}. Mã này có hiệu lực trong 5 phút.

    Trân trọng,
    Công ty Alpha
  `;
};
