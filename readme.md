# Calculator

## Live Demo
A live demo of the calculator can be found [here](https://richardadalton.github.io/calculator/).

## About
Calculator built with HTML, CSS and JavaScript. The purpose of this project is to explore whether a fully functional calculator can be built using **no `if` statements** anywhere in the code.

The calculator supports addition, subtraction, multiplication, division, negation, decimal entry, percent, and repeat-equals — implemented entirely as a finite state machine.

Due to the complexity of calculator behaviour, a suite of Playwright tests covers all features and edge cases to ensure correctness.

## Implementation

### No `if` statements
The no-`if` constraint is enforced throughout. Every branch that would normally use a conditional is instead handled by the current state object. Pressing a button calls the handler for that button on the current state, and the handler both performs the action and transitions to the next state. There are no conditionals anywhere in the logic.

### Finite State Machine
The calculator is modelled as an explicit finite state machine with nine named states:

| State | Description |
|---|---|
| `Initial` | Calculator reset, displaying `0` |
| `Entering LHS` | User is typing the left-hand operand |
| `Entering LHS (decimal set)` | LHS entry with decimal point already placed |
| `Operator set` | An operator has been pressed; awaiting right-hand operand |
| `Entering RHS` | User is typing the right-hand operand |
| `Entering RHS (decimal set)` | RHS entry with decimal point already placed |
| `LHS Percent` | `%` pressed on LHS; awaiting `=` to evaluate |
| `RHS Percent` | `%` pressed on RHS; awaiting `=` to evaluate |
| `Result` | A result is displayed after pressing `=` |

Each state is a plain JavaScript object with a complete set of handler functions — one per button. Pressing a button dispatches to `state.handle_<button>()`, which updates the display and calls `enter(next_state)` to transition. The `enter` function uses `Object.assign` to atomically replace all handlers on the shared state object, keeping the transition free of conditionals.

```js
function enter(named_state) {
    Object.assign(state, named_state);
    update_state_display();
}
```

States that differ only slightly (e.g. decimal already placed) are defined using spread syntax so only the overriding handlers need to be specified:

```js
const entering_lhs_no_decimal = {
    ...entering_lhs,
    _name: 'Entering LHS (decimal set)',
    handle_decimal: do_nothing,
};
```

### Educational UI
The page includes a live state machine panel alongside the calculator that shows all nine states, highlights the current state as you interact, and lists the active handler for every button in the current state. This makes the underlying state machine visible in real time.

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

Open `index.html` in your web browser to use the calculator.

## Running the Tests

Run npm test to execute the Playwright test suite.

```bash
$ npm test
```

