
export function redLog(message) {
  console.log('%c ' + message, 'color: #f00; font-weight: 700');
}

export function delay(time = 400) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}