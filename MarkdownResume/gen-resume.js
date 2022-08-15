const marked = require('marked');
const fs = require("fs");
const pdf = require('html-pdf');

// options
const pdfOptions = { format: 'Letter',  };
const resumePath = './';
const resumeName = 'spencer-shadley-resume';
const cssPath = `${resumePath}example.css`

try {
  // markdown
  let markdown = fs.readFileSync(`${resumePath}${resumeName}.md`).toString('utf-8');
  const css = `<style> ${fs.readFileSync(cssPath, 'utf-8')} </style>\n`;
  markdown = `${css} ${markdown}`

  // HTML
  const html = marked.parse(markdown);
  fs.writeFileSync(`${resumePath}${resumeName}.html`, html);

  // PDF
  pdf.create(html, pdfOptions).toFile(`${resumePath}${resumeName}.pdf`, function(err, res) {
    if (err) return console.log(err);
    console.log(res);
  });
}
catch(error) {
  console.error(error);
}