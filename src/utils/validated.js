const validateTime = (time) => {
   const now = new Date();
   const target = new Date(time);

   const diff = Math.abs(now.getTime() - target.getTime());

   let unit = 'vừa xong';
   let value = 0;

   let realValue = 0;

   if (diff < 60000) {
      unit = 'vài giây trước';
      realValue = (Math.ceil(diff / 60000) - diff / 60000) * 60000;
   } else if (diff < 3600000) {
      unit = 'phút';
      value = Math.floor(diff / 60000);
      realValue = (Math.ceil(diff / 60000) - diff / 60000) * 60000;
   } else if (diff < 86400000) {
      unit = 'giờ';
      value = Math.floor(diff / 3600000);
      realValue = (Math.ceil(diff / 3600000) - diff / 3600000) * 3600000;
   } else if (diff < 604800000) {
      unit = 'ngày';
      value = Math.floor(diff / 86400000);
      realValue = (Math.ceil(diff / 86400000) - diff / 86400000) * 86400000;
   } else if (diff < 2592000000) {
      unit = 'tuần';
      value = Math.floor(diff / 604800000);
      realValue = (Math.ceil(diff / 604800000) - diff / 604800000) * 604800000;
   } else if (diff < 31536000000) {
      unit = 'tháng';
      value = Math.floor(diff / 2592000000);
      realValue = (Math.ceil(diff / 2592000000) - diff / 2592000000) * 2592000000;
   } else {
      unit = 'năm';
      value = Math.floor(diff / 31536000000);
      realValue = (Math.ceil(diff / 31536000000) - diff / 31536000000) * 31536000000;
   }

   return {
      unit,
      value,
      realValue,
   };
};

export { validateTime };
