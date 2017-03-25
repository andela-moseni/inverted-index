[![Code Climate](https://codeclimate.com/github/andela-moseni/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-moseni/inverted-index) [![Coverage Status](https://coveralls.io/repos/github/andela-moseni/inverted-index/badge.png?branch=development)](https://coveralls.io/github/andela-moseni/inverted-index?branch=development) [![Build Status](https://travis-ci.org/andela-moseni/inverted-index.svg?branch=development)](https://travis-ci.org/andela-moseni/inverted-index)
# Inverted Index
## Introduction
An Inverted Index is an Index Data Structure storing a mapping from content to location (i.e. a mapping of words or numbers to it's location in a database file). It use the elasticsearch method, which is designed to allow very fast full-text searches.

## Features
- Upload file(s)
- Create an index for uploaded file(s)
- Search through indexed files 

### Why the project is useful
The project implements Elasticsearch also known as Inverted Index which is known to achieve fast search responses because instead of searching the text directly, it searches an index instead.

### How users can get started with the project
  - Requirements
    * To run the app locally, you need to have `node.js` installed
  - How to setup the project/Installation/Configuration
    * Clone the repo `git clone https://github.com/andela-moseni/inverted-index.git`
    * Change directory into `inverted-index` folder
    * Run `npm install` to install all dependencies
    * Run `npm start` to run the application
  - How to run tests
    * Run `npm test` 

### How to use the app
When the app has started: 
* Click on `Upload File` to upload valid JSON file(s)
* Upon successful upload, click on the `Create Index` button 
* Scroll down the page to see the created Index displayed in a tabular format
* Choose a file to search through a file or `All files` to search through all files, input search words and click on the `Search` button
* Scroll down to see the search result

### Technology stack
* Node JS
* ES6
* AngularJS
* Gulp
* Karma 
* Jasmine

### Limitations of the project
The application can only upload JSON files in a specific format. 

### Contributing to the project
* Fork this repositry to your account
* Clone your repositry -  `git clone https://github.com/andela-moseni/inverted-index.git`
* Create your feature branch - `git checkout -b new-feature`
* Commit your changes - `git commit -m "did something"`
* Push to the remote branch - `git push origin new-feature`
* Open a pull request.

### Troubleshooting & FAQ
- [inverted-index issues page](https://github.com/andela-moseni/inverted-index/issues)

### License
  *  **MIT**
## Author
* **Halimat Mercy Oseni**