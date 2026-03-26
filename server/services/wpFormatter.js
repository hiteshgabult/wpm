export const formatToWP = (html) => {
  return html
    .replace(/\n+/g, '\n')
    .replace(/<p>/g, '\n<p>')
    .replace(/<\/p>/g, '</p>\n')
    .replace(/<h1>/g, '\n<h1>')
    .replace(/<\/h1>/g, '</h1>\n')
    .replace(/<table>/g, '\n<table border="1">')
    .replace(/<\/table>/g, '</table>\n');
};