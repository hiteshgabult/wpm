export const formatToWP = (html)=>{
 return html
 .replace(/<p>/g,'<!-- wp:paragraph --><p>')
 .replace(/<\/p>/g,'</p><!-- /wp:paragraph -->')
 .replace(/<h2>/g,'<!-- wp:heading --><h2>')
 .replace(/<\/h2>/g,'</h2><!-- /wp:heading -->')
 .replace(/<table>/g,'<!-- wp:table --><table>')
 .replace(/<\/table>/g,'</table><!-- /wp:table -->');
};
