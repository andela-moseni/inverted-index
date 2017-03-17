/**
 * inverted index class
 * @class
 */
class InvertedIndex {
  /**
  * class constructor
  * @constructor
  */
  constructor() {
    this.fileIndices = {};
  } 
  /**
   * Set Index - Sets the indices of all indexed files
   * @param {String} filename - Name of the indexed file
   * @param {Object} indices - Indices of the file
   * @return {object} Indexed file name and it's indices'
   */
  setIndex(filename, indices) {
    this.fileIndices[filename] = indices;
  }
  validateFile(file) {
    if (typeof file !== 'object' || file.length === 0) {
      return false;
    }
      for (let i = 0; i < file.length; i += 1) {
        let item = file[i];
        if (!(item.hasOwnProperty('title') && item.hasOwnProperty('text'))) {
          // console.log("Upload a valid json file");
          return false;
        }
      }
     return true;
  }
  readFile(file) {
    // this.file = file;
    // JSON.parse(JSON.stringify(file));
  }
  tokenize(text) { 
    const error = /[^\w\s]/g;
    return text.replace(error, " ").toLowerCase().split(" ").sort().filter(item => Boolean(item));
  }
  createIndex(fileName, fileContent) {
    const indices = {};
    if (this.validateFile(fileContent)) {
      fileContent.forEach((doc, docIndex) => {
        const newString = `${doc.title} ${doc.text}`;
        let tokenArray = this.tokenize(newString);
        tokenArray.forEach((token) => {
          if (token in indices) {
            if (indices[token].indexOf(docIndex) === -1) {
              indices[token].push(docIndex);
            }
          } else {
            indices[token] = [docIndex];
          }
        });
      });
      indices.length = fileContent.length;
      console.log(indices);
      this.setIndex(fileName, indices);
        return 'Index created';
    }
     return 'Index not created';
  }
  getIndex(filename) {
    let newObj = {};
    let tokens = Object.keys(this.fileIndices[filename]).sort();
    tokens.forEach((token) => {
      newObj[token] = this.fileIndices[filename][token];
    });
    return newObj;
  }
  search(item, file) {
    let searchResult = {};
    searchResult = { index: {}, length: this.fileIndices[file].length };
    item.forEach((text) => {
      if (this.fileIndices[file].index.hasOwnProperty(text)) {
        searchResult.index[text] = this.fileIndices[file].index[text];
      }
    });
    return searchResult;
  }
  searchIndex(word, fileName) {
    const searchResult = {};
    word = word.split(' ').join(' ');
    const newWord = this.tokenize(word);
    if (fileName) {
      Object.keys(this.fileIndices).forEach((files) => {
        searchResult[files] = this.search(newWord, files);
      });
    } else {
      searchResult[fileName] = this.search(newWord, fileName);
    }
    return searchResult;
  }
}
