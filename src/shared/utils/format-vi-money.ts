export const formatViMoney = (number: number): string => {
  // Chuyển số thành chuỗi và thêm dấu phẩy
  const formattedNumber = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedNumber} VNĐ`;
};
