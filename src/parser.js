
export function topicsParser(htmlText) {
  const itemExp = /<div class=\"cell\s+item\"\s+style=\"\">\s*<table[\s\S]+?\/member\/([a-zA-Z0-9]+)[\s\S]+?src=\"([^"]+)\"[\s\S]+?\/t\/(\d+)[\s\S]+?>([^]+?)<\/a>[\s\S]+?\/go\/(\w+)\">([^>]+)<[\s\S]+?<\/strong>([^<]+)<strong[\s\S]+?\/member\/(\w+)[\s\S]+?>(\d+)<\/a[\s\S]+?<\/table>\s*?<\/div>/ig;
  let r;
  let array = [];
  while (r = itemExp.exec(htmlText)) {
    array.push({
      id: r[3],
      title: r[4],
      replies: r[9],
      member: {
        username: r[1],
        avatar_normal: r[2]
      },
      node: {
        name: r[5],
        title: r[6]
      },
      last_touched: r[7].replace(/&nbsp;|•|最后回复来自/g, '').trim(),
      last_reply: r[8]
    });
  }
  return array;
}