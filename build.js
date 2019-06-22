const path = require('path');
const fs = require('fs');
const pug = require('pug');
const markdown = new require('markdown-it')();
const htmlclean = require('htmlclean');
const csso = require('csso');
const Purgecss = require('purgecss');
const { inlineSource } = require('inline-source');
const pages = require('./src/pages');


function buildPages() {
  const templateFn = pug.compileFile("./src/base.pug");
  const distRoot = path.resolve("dist");

  for(key of Object.keys(pages)) {
    const dest = path.join(distRoot, key + ".htm");
    const data = pages[key];
    data['renderedContent'] = markdown.render(data['content']);

    fs.writeFileSync(dest, htmlclean(templateFn(data)));
  }
}

function buildCss() {
  const sourceCss = fs.readFileSync("./src/style.css");
  fs.writeFileSync("./dist/style.css", sourceCss);
}

function minifyCss() {
  const purgeCss = new Purgecss({
    content: ['dist/*.htm'],
    css: ['dist/*.css']
  });

  const results = purgeCss.purge();

  results.forEach(function (obj) {
    fs.writeFileSync(obj.file, csso.minify(obj.css).css);
  });
}

async function inlineCss() {
  const distRoot = path.resolve("dist");
  for(key of Object.keys(pages)) {
    const dest = path.join(distRoot, key + ".htm");
    let inlinedHtml = await inlineSource(dest, {
      compress: true,
      rootpath: distRoot
    });

    fs.writeFileSync(dest, inlinedHtml);
  }
}

buildCss();
buildPages();
minifyCss();
inlineCss();
