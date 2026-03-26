export const formatToWP = (html) => {

  let output = '';

  // Split by tags
  const parts = html.split(/<\/?(h1|h2|h3|p|ul|ol|table)[^>]*>/i);

  // HEADINGS
  html = html.replace(/<h1>(.*?)<\/h1>/gi, (_, text) => {
    return `<!-- wp:heading -->
<h2>${text}</h2>
<!-- /wp:heading -->`;
  });

  html = html.replace(/<h2>(.*?)<\/h2>/gi, (_, text) => {
    return `<!-- wp:heading -->
<h2>${text}</h2>
<!-- /wp:heading -->`;
  });

  html = html.replace(/<h3>(.*?)<\/h3>/gi, (_, text) => {
    return `<!-- wp:heading -->
<h3>${text}</h3>
<!-- /wp:heading -->`;
  });

  // PARAGRAPH
  html = html.replace(/<p>(.*?)<\/p>/gi, (_, text) => {
    return `<!-- wp:paragraph -->
<p>${text}</p>
<!-- /wp:paragraph -->`;
  });

  // LIST
  html = html.replace(/<ul>(.*?)<\/ul>/gis, (_, text) => {
    return `<!-- wp:list -->
<ul>${text}</ul>
<!-- /wp:list -->`;
  });

  // TABLE
  html = html.replace(/<table[^>]*>(.*?)<\/table>/gis, (_, text) => {
    return `<!-- wp:table -->
<figure class="wp-block-table">
<table>${text}</table>
</figure>
<!-- /wp:table -->`;
  });

  return html;
};