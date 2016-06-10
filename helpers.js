var hbs = require('./node_modules/ghost/node_modules/express-hbs');
var _ = require('./node_modules/ghost/node_modules/lodash');
var downsize = require('./node_modules/ghost/node_modules/downsize');

module.exports = function () {
    hbs.registerHelper('short_content', function () {

        excerpt = String(this.html);
        // Strip inline and bottom footnotes
        excerpt = excerpt.replace(/<span class="caption">.*<\/span>/gi, '');
        excerpt = excerpt.replace(/<code>.*<\/code>/gi, '');
        excerpt = excerpt.replace(/<a href="#fn.*?rel="footnote">.*?<\/a>/gi, '');
        excerpt = excerpt.replace(/<div class="footnotes"><ol>.*?<\/ol><\/div>/, '');

        excerpt = excerpt.replace(/<\/?[^>]+>/gi, '');
        excerpt = excerpt.split('.');
        excerpt = excerpt[0].replace(/(\r\n|\n|\r)+/gm, ' ');
        return excerpt + '.';
    });

    //When date is 26/06/2015 19:00
    //date format="DD/MM/YYYY HH:mm"
    hbs.registerHelper("formatDate", function (options) {

        var postDate = options.fn(this),
            postDateYear,
            postDateWithoutNewYearChars,
            postDateWithouYearsChars,
            postDateTime,
            postNewDate;

        postDateYear = postDate.slice(8, 10);
        postDateWithoutNewYearChars = parseInt(postDateYear) + 1;

        postDateWithouYearsChars = postDate.slice(0, 8);
        postDateTime = postDate.slice(-6);

        postNewDate = postDateWithouYearsChars + postDateWithoutNewYearChars + postDateTime;

        return new hbs.SafeString(postNewDate);
    });

    hbs.registerHelper('inlineArray', function() {
        var ret = '';
        var options = arguments[arguments.length - 1];
        var arr = Array.prototype.slice.call(arguments, 0, arguments.length - 1);

        for (var i = 0, len = arr.length; i < len; i += 1) {
            var split = arr[i].split('|');

            ret += options.fn({
                name: split[0].trim(),
                link: split[1] ? split[1].trim() : '#'
            });
        }

        return ret;
    });
};
