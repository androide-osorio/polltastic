Polltastic
===
[![Build Status](https://travis-ci.org/androide-osorio/polltastic.svg?branch=master)](https://travis-ci.org/androide-osorio/polltastic)

A super duper simple, embeddable cloud service to create and manage polls across multiple devices with multiple client support, automatic updating, and powerful reporting and sharing capabilities.

Project Requirements
---
You must have nodeJS installed on you machine or server. You can find instructions on how to install it [here](https://nodejs.org). Make sure to have the following packages installed globally:

| Software | Version  | Installation                                |
|----------|----------|---------------------------------------------|
| node JS  | >= 4.5.0 | Specific for the OS. More information [here](https://nodejs.org/en/download/package-manager/)  |
| babel    | >= 6.x   | `npm install -g babel`                      |

Project Dependencies
---
Polltastic uses React technologies for Component-based User Interfaces, combined with the Redux framework for handling application state. The libraries used are:

### Front end dependencies
* [React (JS v1.15+)](https://facebook.github.io/react/).
* [Redux (v3.5.2+)](https://github.com/reactjs/redux).
* [ImmutableJS (v3.8.1+)](https://facebook.github.io/immutable-js/).

### Testing dependencies
* [mochaJS test Framework (v2.5.3+)](https://mochajs.org/).
* [chaiJS assertions library (v3.5.0)](http://chaijs.com/).
* [chai-immutable library (v1.6.0+)](https://github.com/astorije/chai-immutable) for making assertions with immutable data structures.

Project Setup
---
Clone this repository in your local machine or server in the location you need:

```bash
$ cd /path/to/polltastic
$ git clone https://github.com/androide-osorio/polltastic.git
```

Install node packages by running:
```bash
$ npm install
```

Start the node application server in the machine with the command:
```bash
$ npm start
```

Alternatively, you can run the application's tests with the commands:
```bash
# run the test suite once
$ npm test

# run the tests in watch mode
$ npm run test:watch
```

Author
---
made with a lot of <3 by Androide Osorio. 2016.

Based on an excellent tutorial of [Full-Stack Redux development](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html) published by [Tero Parviainen](http://teropa.info/). This is a must-read one. Tero, if you read this, thank you very much for that awesome tutorial 😄
