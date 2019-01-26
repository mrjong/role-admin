import Cookies from 'js-cookie';
Cookies.setItem = Cookies.set;
Cookies.getItem = Cookies.get;
let uuids = '';
let storage = {};
let uuiditem = '55607F8A-228A-4151-AE12-F0444756394C';

storage.setItem = function(original, data, storageType, userName) {
  if (userName) {
    console.log(userName, '5555555555555');
    uuids = getuuids(userName);
  } else {
    uuids = getuuids();
  }
  console.log(uuids, '77777777777');
  storageType.setItem(`${uuids}${original}`, JSON.stringify(data));
};
storage.getItem = function(original, storageType) {
  uuids = getuuids();
  return JSON.parse(storageType.getItem(`${uuids}${original}`));
};
storage.removeItem = function(original, storageType) {
  uuids = getuuids();
  storageType.removeItem(`${uuids}${original}`);
};
function getuuids(userName) {
  if (userName || !localStorage.getItem(uuiditem)) {
    let uuidtest = userName ? uuid() + userName : uuid();
    console.log(uuidtest, userName, '33333333333');
    console.log(uuidtest, '22222222222');
    localStorage.setItem(uuiditem, uuidtest);
    return uuidtest;
  } else {
    return localStorage.getItem(uuiditem);
  }
}
/**
 * 唯一标识
 */
function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data. At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}
export default storage;
