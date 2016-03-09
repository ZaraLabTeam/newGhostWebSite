var hbs = require('./node_modules/ghost/node_modules/express-hbs');
var _ = require('./node_modules/ghost/node_modules/lodash');
var downsize = require('./node_modules/ghost/node_modules/downsize');

module.exports = function() {
  hbs.registerHelper('short_content', function() {


    excerpt = String(this.html);
    // Strip inline and bottom footnotes
    excerpt = excerpt.replace(/<span class="caption">.*<\/span>/gi, '');
    excerpt = excerpt.replace(/<code>.*<\/code>/gi, '');
    excerpt = excerpt.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
    excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');

    excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
    excerpt = excerpt.split('.');
    excerpt = excerpt[0].replace(/(\r\n|\n|\r)+/gm, ' ');
    return excerpt + '.'
  });
};

