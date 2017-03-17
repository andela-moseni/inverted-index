const invertedIndex = new InvertedIndex();
const indexed = angular.module('Indexed', ['toastr']);
let fileContent = {};

// file controller 
indexed.controller('fileController', ($scope, toastr) => {
	$scope.fileContent = null;
	$scope.filesCount = [];
	$scope.uploadedFiles = [];
	$scope.indexed = null;
	$scope.indexedFiles = null;
	$scope.showTable = false;
	$scope.showSearch = false;
	$scope.titles = [];
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
                console.log(validFile);
                if (validFile) {
                	$scope.uploadedFiles[file.name] = fileContent;
                	$scope.titles.push(file.name);
                	$scope.filesCount[file.name] = fileContent.length;
                	toastr.success(file.name + ' has been uploaded', 'Successful file upload');
                } else {
                	throw new Error('error');
                }
       		}
                catch (err) {
                toastr.error('Upload a valid JSON file', 'Invalid JSON File');
              
              } 
            });
          };
          reader.readAsText(file);
        });
      });
});
