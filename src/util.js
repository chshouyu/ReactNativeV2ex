
export function redLog(message) {
  console.log('%c ' + message, 'color: #f00; font-weight: 700');
}

export function blueLog(message) {
  console.log('%c ' + message, 'color: blue; font-weight: 700');
}

export function delay(time = 400) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const mon = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();

  return `${year}-${mon}-${day} ${hour}:${min}:${sec}`
    .replace(/([^\d])(\d)(?!\d)/g, '$10$2');
}