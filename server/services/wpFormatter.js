export const formatToWP = (html) => {
  return html
    .replace(/<p>/g, '<!-- wp:paragraph --><p>')
    .replace(/<\/p>/g, '</p><!-- /wp:paragraph -->')
    .replace(/<h1>/g, '<!-- wp:heading --><h1>')
    .replace(/<\/h1>/g, '</h1><!-- /wp:heading -->')
    .replace(/<table>/g, '<!-- wp:table --><table>')
    .replace(/<\/table>/g, '</table><!-- /wp:table -->');
};