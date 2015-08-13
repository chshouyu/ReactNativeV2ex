
'use strict';

var formatTime = (timestamp) => {
  var date = new Date(timestamp * 1000);
  var year = date.getFullYear();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  return `${year}-${mon}-${day} ${hour}:${min}:${sec}`.replace(/([^\d])(\d)(?!\d)/g, '$10$2');
};

exports.formatTime = formatTime;