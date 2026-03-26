import * as cheerio from 'cheerio';

export const cleanHTML = (html) => {
  const $ = cheerio.load(html);

  // remove unwanted tags
  $('meta, style, script').remove();

  // remove span but keep content
  $('span').each((i, el) => {
    $(el).replaceWith($(el).html());
  });

  // remove attributes
  $('[style]').removeAttr('style');

  // remove empty tags
  $('p:empty').remove();

  // ✅ TABLE FIX (same as before but clean text)
  $('table').each((i, table) => {
    let grid = [];

    $(table).find('tr').each((rowIndex, tr) => {
      grid[rowIndex] = [];
      let colIndex = 0;

      $(tr).find('td,th').each((i, cell) => {
        let rowspan = parseInt($(cell).attr('rowspan') || 1);
        let colspan = parseInt($(cell).attr('colspan') || 1);

        while (grid[rowIndex][colIndex]) colIndex++;

        for (let r = 0; r < rowspan; r++) {
          for (let c = 0; c < colspan; c++) {
            if (!grid[rowIndex + r]) grid[rowIndex + r] = [];
            grid[rowIndex + r][colIndex + c] = $(cell).text().trim();
          }
        }

        colIndex++;
      });
    });

    let newTable = '<table border="1">';
    grid.forEach(row => {
      newTable += '<tr>';
      row.forEach(cell => {
        newTable += `<td>${cell}</td>`;
      });
      newTable += '</tr>';
    });
    newTable += '</table>';

    $(table).replaceWith(newTable);
  });

  // ✅ ONLY BODY CONTENT (IMPORTANT)
  return $('body').html();
};