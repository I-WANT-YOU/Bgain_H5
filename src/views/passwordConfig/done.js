export default (text) => {
  const re = /^\d+$/;
  let data;
  if (re.test(text)) {
    data = `${text.substr(0, 3)}*****${text.substr(8)}`;
  } else {
    const arr = text.split('@');
    let star = '';
    if (arr[0].length <= 3) {
      star = '*';
      arr[0] = arr[0].substr(0, arr[0].length - 1) + star;
    } else {
      for (let i = 0; i < arr[0].substr(3).length; i++) {
        star += '*';
      }
      arr[0] = arr[0].substr(0, 3) + star;
    }
    data = `${arr[0]}@${arr[1]}`;
  }
  return data;
};
