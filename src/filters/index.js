import dayjs from 'dayjs';
// <!-- value 格式为13位unix时间戳 -->
// <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
exports.formatDate = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
    console.log(date)
  return dayjs(date).format(fmt);
};
exports.tableDate = (date) => {
  return `${date.substring(0,4)}-${date.substring(4,6)}-${date.substring(6,8)}`;
}
exports.formatDatetime = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};
exports.money = (val) => {
  let valCopy = val;
  valCopy = valCopy + ''.replace(/\$|\,/g, '');
  if (isNaN(valCopy)) {
    valCopy = '0';
  }
  let sign = valCopy == (valCopy = Math.abs(valCopy));
  valCopy = Math.floor(valCopy * 100 + 0.50000000001);
  let cents = valCopy % 100;
  valCopy = Math.floor(valCopy / 100) + '';
  if (cents < 10) {
    cents = '0' + cents;
  }
  for (var i = 0; i < Math.floor((valCopy.length - (1 + i)) / 3); i++) {
    valCopy =
			valCopy.substring(0, valCopy.length - (4 * i + 3)) + ',' + valCopy.substring(valCopy.length - (4 * i + 3));
  }

  return (sign ? '' : '-') + valCopy + '.' + cents;
};
exports.isSubmit = (val) => {
  console.log(val, '---------------')
  switch (val) {
    case 0:
      return '是';
    default:
      return '否';
  }
};
