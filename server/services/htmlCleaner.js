import * as cheerio from 'cheerio';

export const cleanHTML = (html) => {
  const $ = cheerio.load(html);

  $('meta,style,script').remove();
  $('span').each((i, el) => $(el).replaceWith($(el).html()));
  $('[style]').removeAttr('style');

  return $('body').html();
};