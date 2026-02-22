import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('artifacts/mirror/source-index.html', 'utf8');
const $ = cheerio.load(html);

const srcs = [];
$('[srcset], [imagesrcset]').each((i, el) => {
    const srcset = $(el).attr('srcset') || $(el).attr('imagesrcset');
    if (srcset) srcs.push(srcset);
});

const match = srcs.find(s => s && s.includes('food-pyramid'));
console.log('Match found in srcset:', !!match);
if (match) {
    console.log('Srcset value:', match);
} else {
    // Let's do a raw string search to confirm it's in the document at all
    console.log('Raw search index:', html.indexOf('food-pyramid'));
    if (html.indexOf('food-pyramid') > -1) {
        const idx = html.indexOf('food-pyramid');
        console.log('Context:', html.substring(idx - 50, idx + 150));
    }
}
