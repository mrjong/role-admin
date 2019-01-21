import dayjs from 'dayjs';
// <!-- value 格式为13位unix时间戳 -->
// <!-- 10位unix时间戳可通过value*1000转换为13位格式 -->
exports.formatDate = (date, fmt) => {
	return dayjs(date).format(fmt);
};
exports.money = (val) => {
	let valCopy = val;
	valCopy = valCopy.toString().replace(/\$|\,/g, '');
	if (isNaN(valCopy)) {
		valCopy = '0';
	}
	let sign = valCopy == (valCopy = Math.abs(valCopy));
	valCopy = Math.floor(valCopy * 100 + 0.50000000001);
	let cents = valCopy % 100;
	valCopy = Math.floor(valCopy / 100).toString();
	if (cents < 10) {
		cents = '0' + cents;
	}
	for (var i = 0; i < Math.floor((valCopy.length - (1 + i)) / 3); i++) {
		valCopy =
			valCopy.substring(0, valCopy.length - (4 * i + 3)) + ',' + valCopy.substring(valCopy.length - (4 * i + 3));
	}

	return (sign ? '' : '-') + valCopy + '.' + cents;
};
