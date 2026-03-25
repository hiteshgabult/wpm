import cheerio from 'cheerio';

export const cleanHTML = (html)=>{
 const $ = cheerio.load(html);

 // remove spans
 $('span').each((i,el)=>$(el).replaceWith($(el).html()));

 // remove inline styles
 $('[style]').removeAttr('style');

 // basic table normalization
 $('table').each((i,table)=>{
   $(table).attr('border','1');
 });

 return $.html();
};
