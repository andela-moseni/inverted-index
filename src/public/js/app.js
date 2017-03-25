/* eslint-disable no-undef */

const invertedIndex = new InvertedIndex();
const indexed = angular.module('Indexed', ['toastr']);

// file controller
indexed.controller('fileController', ($scope, toastr) => {
  $scope.fileContent = {};
  $scope.docsCount = {};
  $scope.uploadedFiles = [];
  $scope.indexed = {};
  $scope.indexedFiles = null;
  $scope.showTable = false;
  $scope.showSearch = false;
  $scope.showResultTable = false;
  $scope.fileNames = [];
  $scope.fileTitles = {};
  $scope.tableTitle = false;
  $scope.selected = null;
  /**
   * Reads content of uploaded files
   * Uploads valid  file and throw error for invalid file
  **/
  document.getElementById('file-input')
    .addEventListener('change', (e) => {
      loadedFiles = Array.from(e.target.files);
      loadedFiles.forEach((file) => {
        reader = new FileReader();
        reader.onload = (es) => {
          $scope.$apply(() => {
            try {
              const fileContent = JSON.parse(es.target.result);
              const validFile = invertedIndex.validateFile(fileContent);
              const fileExists = $scope.fileNames.indexOf(file.name) !== -1;
              if (fileExists) {
                toastr.warning('File already exists!');
                return;
              }
              if (validFile) {
                $scope.fileContent[file.name] = fileContent;
                $scope.fileNames.push(file.name);
                $scope.docsCount[file.name] = Object.keys(fileContent).length;
                toastr.success(`${file.name} has been uploaded`,
                'Successful file upload');
              } else {
                throw new Error('error');
              }
            } catch (err) {
              toastr.error('Upload a valid JSON file', 'Invalid JSON File');
            }
          });
        };
        reader.readAsText(file);
      });
    });
    /*
    creates index for uploaded file
    */
  $scope.createIndex = () => {
    const selectedFile = document.getElementById('selectedFile').value;
    $scope.selectedFile = selectedFile;
    if (selectedFile === '--Select a file to create index--') {
      toastr.error('Upload and select a file', 'No file Selected');
      return;
    }
    if (selectedFile) {
      const fileContent = $scope.fileContent[selectedFile];
      invertedIndex.createIndex(selectedFile, fileContent);
      const index = invertedIndex.getIndex(selectedFile);
      $scope.indexed[selectedFile] = index;
      const titles = [];
      Object.keys(fileContent).forEach((content) => {
        titles.push(fileContent[content].title);
      });
      $scope.fileTitles[selectedFile] = titles;
      toastr.success('Inverted index created', 'Success');
      $scope.showTable = true;
      $scope.tableTitle = true;
      $scope.showResultTable = false;
      $scope.indexedFiles = invertedIndex.fileIndices;
    }
  };
  $scope.range = (value) => {
    const count = [];
    for (let i = 0; i < value; i += 1) {
      count.push(i);
    }
    return count;
  };
  $scope.searchIndex = () => {
    if (!$scope.indexedFiles) {
      toastr.error('Create an index, then search');
      return;
    }
    const searchFile = document.getElementById('searchFile').value;
    $scope.searchFile = searchFile;
    const query = document.getElementById('searchBox').value;
    $scope.query = query;
    if (searchFile === 'Select a file to search' &&
    (query === '' || query === undefined)) {
      toastr.error('Select a file and enter word(s) to search.',
      'No file selected / search parameter ');
    } else if (searchFile === 'Select a file to search') {
      toastr.error('Select a valid file to search', 'No file selected');
      $scope.showTable = false;
    } else if (query.trim().length === 0) {
      toastr.error('Enter a valid search term', 'Invalid search term');
      $scope.showResultTable = false;
      $scope.tableTitle = false;
      $scope.showTable = false;
      return;
    } else if (query === '' || query === undefined) {
      toastr.error('Enter word(s) to search!', 'No Search Parameter');
      $scope.showTable = false;
      $scope.tableTitle = false;
      return false;
    } else {
      $scope.mySearch = invertedIndex.searchIndex(query, searchFile);
      $scope.showTable = false;
      $scope.tableTitle = false;
      $scope.showResultTable = true;
      return;
    }
    $scope.showTable = true;
    $scope.tableTitle = true;
  };
});
