const book = 
[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
];
describe('Inverted Index', () => {
  const invertedIndex = new InvertedIndex();
  invertedIndex.createIndex(book, 'files');

  describe('Inverted Index class, check all methods', () => {
  	it('should check that class has a readFile method', () => {
      expect(typeof InvertedIndex.prototype.readFile).toBe('function');
    });

    it('should check that the class has a createIndex method', () => {
      expect(typeof InvertedIndex.prototype.createIndex).toBe('function');
    });

    it('should check that the class has a validateIndex method', () => {
      expect(typeof InvertedIndex.prototype.validateFile).toBe('function');
    });

    it('should check that the class has a tokenize method', () => {
      expect(typeof InvertedIndex.prototype.tokenize).toBe('function');
    });

    it('should check that the class has a getIndex method', () => {
      expect(typeof InvertedIndex.prototype.getIndex).toBe('function');
    });

    it('should check that the class has a searchIndex method', () => {
      expect(typeof InvertedIndex.prototype.searchIndex).toBe('function');
    });
  });

  describe('validateIndex should check files', () => {
    it('should check that the contents of the uploaded file is a valid json file', () => {
      expect(inverted.validateIndex(book)).toBeTruthy();
    });

    it('should return false for empty json files', () => {
      expect(inverted.validateIndex([])).toBeFalsy();
    });

    it('should check file has property "title" and "text" ', () => {
      expect(inverted.validateIndex.prototype.hasOwnProperty('title')).toBeTruthy();
      expect(inverted.validateIndex('text')).toBeTruthy();
    });
  });

  describe('Generate Index', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(inverted.getIndex('files')).length).toBeGreaterThan(0);
    });

    it('should check that index maps the string to the correct objects in json array', () => {
      expect(inverted.getIndex('files').index.rings).toEqual([1]);
    });
  });

  describe('searchIndex should return valid search results', () => {
    it('should return an arrray of objects indexes of the searched words', () => {
      expect(inverted.searchIndex('of', 'files')).toEqual({ files: { index: { of: [0, 1] }, length: 2 } });
      expect(inverted.searchIndex('alice powerful wonderland', 'files')).toEqual({ files: { index: { alice: [0], powerful: [1], wonderland: [1] }, length: 3 } });
    });
    
    it('should return search result if a file name is not specified', () => {
      expect(inverted.searchIndex('unusual alliance')).toEqual({ files: { index: { unusual: [1], alliance: [1] }, length: 2 } });
    });
  });
});