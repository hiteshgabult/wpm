export const formatToWP = (html) => {
  return html
    .replace(/\n+/g, '\n')
    .replace(/<p>/g, '\n<!-- wp:paragraph -->\n<p>')
    .replace(/<\/p>/g, '</p>\n<!-- /wp:paragraph -->\n')
    .replace(/<h1>/g, '\n<!-- wp:heading -->\n<h1>')
    .replace(/<\/h1>/g, '</h1>\n<!-- /wp:heading -->\n')
    .replace(/<table>/g, '\n<!-- wp:table -->\n<table>')
    .replace(/<\/table>/g, '</table>\n<!-- /wp:table -->\n');
};