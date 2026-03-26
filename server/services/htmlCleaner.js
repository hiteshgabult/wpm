import * as cheerio from 'cheerio';

export const cleanHTML = (html) => {
  const $ = cheerio.load(html);

  $('meta,style,script').remove();

  // remove span
  $('span').each((i, el) => {
    $(el).replaceWith($(el).html());
  });

  // remove styles
  $('[style]').removeAttr('style');

  // FIX TABLE
  $('table').each((i, table) => {
    $(table).attr('border', '1');
    $(table).removeAttr('style');
  });

  return $('body').html();
};