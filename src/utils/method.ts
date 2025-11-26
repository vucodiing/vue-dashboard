import { ElNotification } from 'element-plus';
import type { MushroomError } from 'mushroomjs';
const showNotification = (content: string, type: 'success' | 'warning' | 'error' | 'info') => {
  ElNotification({
    title:
      type === 'success'
        ? 'Thành công'
        : type === 'warning'
          ? 'Cảnh báo'
          : type === 'error'
            ? 'Lỗi'
            : 'Thông báo',
    message: content,
    type: type,
    showClose: false,
    duration: 1500,
  });
};

const showError = (e: MushroomError) => {
  const code = e.code;
  if (code < 0 || code > 10) {
    showNotification('Lỗi không có quyền truy cập', 'error');
  } else showNotification('Lỗi kết nối internet', 'error');
};
export default {
  showNotification,
  showError,
};
