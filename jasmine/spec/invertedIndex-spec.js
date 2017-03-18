const values = require('object.values');

const book = require('./allBooks/books.json');
const invalidTitleAndText = require('./allBooks/invalid.json');
const secondBook = require('./allBooks/newBook.json');

describe('invertedIndex Index', () => {
  const invertedIndex = new InvertedIndex();
  invertedIndex.createIndex('book.json', book);
  invertedIndex.createIndex('secondBook.json', secondBook);

  describe('invertedIndex Index class, check all methods', () => {
    it('should check that the class has a createIndex method', () => {
      expect(typeof invertedIndex.createIndex).toBe('function');
    });

    it('should check that the class has a validateFile method', () => {
      expect(typeof invertedIndex.validateFile).toBe('function');
    });

    it('should check that the class has a tokenize method', () => {
      expect(typeof invertedIndex.tokenize).toBe('function');
    });

    it('should check that the class has a getIndex method', () => {
      expect(typeof invertedIndex.getIndex).toBe('function');
    });
  });

  describe('validateFile should check files', () => {
    it('should check that the contents of the uploaded file is a valid json file', () => {
      expect(invertedIndex.validateFile(book)).toBeTruthy();
    });

    it('should return false for empty json files', () => {
      expect(invertedIndex.validateFile([])).toBeFalsy();
    });

    it('should return true if file has property "title" and "text" ', () => {
      expect(invertedIndex.validateFile(book)).toBeTruthy();
    });

    it('should return false if file does not have property "title" and "text" ', () => {
      expect(invertedIndex.validateFile(invalidTitleAndText)).toBeFalsy();
    });
  });

  describe('Generate Index', () => {
    it('should verify that index has been created', () => {
      expect(Object.keys(invertedIndex.getIndex('book.json')).length).toBeGreaterThan(0);
    });

    it('should check that index maps the string to the correct objects in json array', () => {
      const expectedIndex = {
        and: [ 0, 1 ],
        barbie: [ 1 ],
        cindarella: [ 1 ],
        cindy: [ 1 ],
        dearie: [ 0 ],
        going: [ 0 ],
        hello: [ 0 ],
        how: [ 0 ],
        i: [ 0, 1 ],
        it: [ 0 ],
        love: [ 1 ],
        s: [ 0 ],
        you: [ 0 ]
      };
      let result = {};
      result = invertedIndex.getIndex('secondBook.json');
      expect(Object.keys(result)).toEqual(Object.keys(expectedIndex));
      expect(values(result)).toEqual(values(expectedIndex));
    });
  });
});
