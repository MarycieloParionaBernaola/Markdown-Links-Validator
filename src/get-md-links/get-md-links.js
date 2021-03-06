const marked = require('marked');
// Use Marked package to convert Markdown file into HTML
const fs = require('fs');
const { getAllMdFiles } = require('./get-md-files');

// READ FILE
const readFile = (pathStr) => fs.readFileSync(pathStr, 'utf-8').trim();
// Use fs.readFileSync(path, options) method to read a file
// The options parameter contains the encoding, that is a data specification
// The encoding default value is null which returns raw buffer
// Use the universal standard utf-8 encoding system to specify that strings be returned

// GET MD LINKS FROM A FILE
const getMdLinksArr = (mdPath) => {
  const mdLinksArr = [];
  const renderer = new marked.Renderer();
  // Use new Renderer() that is an object containing functions to render tokens to HTML
  renderer.link = (href, _, text) => {
    // Use .link() that is an inline level renderer method
    // Its parameters are href, title and text, all of them are strings
    // It will not use title property, by convention put _
    if (href.includes('http')) {
      // Use includes('http') method to get only URL.
      mdLinksArr.push({ href, text, path: mdPath });
      // Add values of properties href and text. Add key-value file-mdFile that is the file path
    }
  };
  marked(readFile(mdPath), { renderer });
  // The structure is: marked(markdownString [,options] [,callback])
  // MarkdownString is a string of markdown source to be compiled
  // Use Renderer option: new Renderer()

  return mdLinksArr;
};

// GET MD LINKS FROM A FILE OR DIRECTORY
const getAllMdLinksArr = (pathStr) => {
  let allMdLinksArr = [];
  // eslint-disable-next-line no-shadow
  getAllMdFiles(pathStr).forEach((pathStr) => {
    allMdLinksArr = allMdLinksArr.concat(getMdLinksArr(pathStr));
  });
  return allMdLinksArr;
};

module.exports = {
  readFile,
  getMdLinksArr,
  getAllMdLinksArr,
};
