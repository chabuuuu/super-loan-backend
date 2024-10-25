export const createEmailContent = (checkGender: string, borrowerName: string): string => {
  return `  Gửi ${checkGender} ${borrowerName},
  Bạn đã đăng ký tài khoản khách hàng thành công.
  Vui lòng đăng nhập vào hệ thống để được trải nghiệm những gói vay ưu đãi
  
  Mọi thắc mắc xin liên hệ:
  phone: 012345678
  email: alpha-customer@gmail.com`;
};
