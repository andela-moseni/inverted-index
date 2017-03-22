/**
 * inverted index class
 * @class
**/
class InvertedIndex {
  /**
  * class constructor
  * @constructor
  **/
  constructor() {
    this.fileIndices = {};
    this.searchIndices = {};
  } 
  /**
   * Set Index - Sets the indices of all indexed files
   * @param {String} filename - Name of the indexed file
   * @param {Object} indices - Indices of the file
   * @return {object} Indexed file name and it's indices'
  **/
  setIndex(filename, indices) {
    this.fileIndices[filename] = indices;
  }
  /**
   * Validate File
   * It checks if a json file is a json array of json objects
   * @param {Object} file is an array of json objects
   * @return {Boolean} True if a json file is valid and False otherwise
  **/
  validateFile(file) {
    if (typeof file !== 'object' || file.length === 0) {
      return false;
    }
      for (let i = 0; i < file.length; i++) {
        let item = file[i];
        if (!(item.hasOwnProperty('title') && item.hasOwnProperty('text'))) {
          return false;
        }
      }
     return true;
  }
  /**
   * Tokenize
   * It splits sentence into an array of refined words
   * @param {String} text - string of texts
   * @return {Array} An array of refined splitted texts
  **/
  tokenize(text) { 
    const remove = /[^\w\s]/g;  
    return text.replace(remove, " ").toLowerCase().split(" ").sort().filter(item => Boolean(item));
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
      this.setIndex(fileName, indices);
      return 'Index created';
    }
    return 'Index not created';
  }
  /**
   * Get Index
   * It gets the index of a specified filename
   * @param {String} filename - Filename of the index to get
   * @return {Object} An object of each word and their indices in a sorted way
  **/
  getIndex(filename) {
    return this.fileIndices[filename];
  }
   /**
   * Search Index
   * It searches through file(s)
   * @param {String} filename - Filename of the index to get
   * @return {Object} Displays table of search result
  **/
  searchIndex(searchTerm, filename) {
    let searchResult = {};
    this.searchIndices = {};
    if(typeof searchTerm !== 'string') {
      return false;
    }
    searchTerm = this.tokenize(searchTerm);
    let index;

    if (filename !== 'All files') {
      // Search single file with filename
      index = this.fileIndices[filename];
      searchTerm.forEach((term) => {
        if(index[term]){
          searchResult[term] = index[term];
        }
      });
      this.searchIndices[filename] = searchResult;
      console.log(this.searchIndices[filename]);
      return this.searchIndices;
    } 
    // Search all files
    Object.keys(this.fileIndices).forEach((file) => {
      searchResult = {};
      index = this.fileIndices[file];
      searchTerm.forEach((term) => {
        if(index[term]){
          searchResult[term] = index[term];
        }
      });
      this.searchIndices[file] = searchResult;
    });
    return this.searchIndices;
  }
}
