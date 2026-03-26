// server/services/htmlCleaner.js

import * as cheerio from 'cheerio';

export const cleanHTML = (html) => {
  const $ = cheerio.load(html);

  // Remove spans
  $('span').each((i, el) => {
    $(el).replaceWith($(el).html());
  });

  // Remove inline styles
  $('[style]').removeAttr('style');

  // Remove empty paragraphs
  $('p').each((i, el) => {
    if (!$(el).text().trim()) {
      $(el).remove();
    }
  });

  // Table basic cleanup
  $('table').attr('border', '1');

  return $.html();
};