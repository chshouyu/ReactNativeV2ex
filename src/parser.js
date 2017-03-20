
export function topicsParser(htmlText) {
  const itemExp = /<div class=\"cell item\" style=\"(?:[^"]+)?\"><table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\"><tr><td width=\"48\" valign=\"top\" align=\"center\"><a href=\"\/member\/([^"]+)\"><img src=\"([^"]+)\" class=\"avatar\" border=\"0\" align=\"default\" \/><\/a><\/td><td width=\"10\"><\/td><td width=\"auto\" valign=\"middle\"><span class=\"item_title\"><a href=\"\/t\/(\d+)(?:[^"]+)?\">([^<]+)<\/a><\/span><div class=\"sep5\"><\/div><span class=\"small fade\"><div class=\"votes\">(?:<li class=\"fa fa-chevron-up\"><\/li> &nbsp;\d+ &nbsp;&nbsp; )?<\/div><a class=\"node\" href=\"\/go\/([^"]+)\">([^<]+)<\/a> &nbsp;•&nbsp; <strong><a href=\"\/member\/[^"]+\">[^<]+<\/a><\/strong>(?: &nbsp;•&nbsp; ([^&]+) &nbsp;•&nbsp; 最后回复来自 <strong><a href=\"\/member\/([^"]+)\">[^<]+<\/a><\/strong>)?<\/span><\/td><td width=\"70\" align=\"right\" valign=\"middle\">(?:<a href=\"\/t\/\d+(?:[^"]+)?\" class=\"count_livid\">(\d+)<\/a>)?<\/td><\/tr><\/table><\/div>/gi;
  let r;
  let array = [];
  while (r = itemExp.exec(htmlText.replace(/>\s+</g, '><'))) {
    array.push({
      id: r[3],
      title: r[4],
      replies: r[9] || 0,
      member: {
        username: r[1],
        avatar_normal: r[2]
      },
      node: {
        name: r[5],
        title: r[6]
      },
      last_touched: r[7] || null,
      last_reply: r[8] || null
    });
  }
  return array;
}