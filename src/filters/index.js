import dayjs from 'dayjs';
// <!-- value 格式为13位unix时间戳 -->
// <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
exports.formatDate = (date, fmt) => {
	return dayjs(date).format(fmt);
};
