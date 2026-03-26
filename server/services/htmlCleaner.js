import * as cheerio from 'cheerio';

export const cleanHTML = (html) => {
  const $ = cheerio.load(html);

  // remove span + style
  $('span').each((i, el) => $(el).replaceWith($(el).html()));
  $('[style]').removeAttr('style');

  // 🔥 TABLE FIX ENGINE
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
            grid[rowIndex + r][colIndex + c] = $(cell).text();
          }
        }

        colIndex++;
      });
    });

    // rebuild table
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

  return $.html();
};