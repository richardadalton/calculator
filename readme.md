# Calculator

## Live Demo
A live demo of the calculator can be found [here](https://richardadalton.github.io/calculator/).

## About
Calculator built with HTML, CSS and Javasscript. The purpose of this project is to create a simple calculator that can perform basic arithmetic operations such as addition, subtraction, multiplication, and division.
An additional constraint is that the javascript code should contain no 'IF' statements.

'IF' statements are avoided by using a state object that maps operators to functions. This allows the calculator to perform operations based on the operator provided without needing to use conditional statements.

Due to the complexity of calculation operations, a suite of tests have been created using Playwright to ensure that the calculator functions as expected.

## Implementation
The calculator is defined in HTML, and styled using CSS. The functionality is implemented in pure Javascript, no UI frameworks are used. Event listeners are attached to the buttons to handle user input and perform calculations. Clicking on a buttons of the calculator makes the appropriate changes to the various handlers attached to the buttons. 

## Installation

Just clone this repository

```bash
$ git clone git@github.com:richardadalton/calculator.git
```

Install dependencies

Run npm install to install dependencies

```bash
$ npm install
```

## Running the Calculator

Load calculator.html in your web browser to use the calculator.

## Running the Tests

Run npm test to execute the Playwright test suite.

```bash
$ npm test
```

