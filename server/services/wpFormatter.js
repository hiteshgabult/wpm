export const formatToWP = (html) => {
  return html
    .replace(/<h1>/g, '<!-- wp:heading --><h1>')
    .replace(/<\/h1>/g, '</h1><!-- /wp:heading -->')

    .replace(/<p>/g, '<!-- wp:paragraph --><p>')
    .replace(/<\/p>/g, '</p><!-- /wp:paragraph -->')

    .replace(/<ul>/g, '<!-- wp:list --><ul>')
    .replace(/<\/ul>/g, '</ul><!-- /wp:list -->')

    .replace(/<table>/g, '<!-- wp:table --><table>')
    .replace(/<\/table>/g, '</table><!-- /wp:table -->');
};