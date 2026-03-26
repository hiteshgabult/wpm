import * as cheerio from 'cheerio';

export const cleanHTML = (html) => {
  const $ = cheerio.load(html);

  $('span').each((i, el) => {
    $(el).replaceWith($(el).html());
  });

  $('[style]').removeAttr('style');

  $('p').each((i, el) => {
    if (!$(el).text().trim()) $(el).remove();
  });

  $('table').attr('border', '1');

  return $.html();
};