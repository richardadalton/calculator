initial_state = {
    value: 0,
    display_value: "0",
    operator: null,

    handle_cancel: reset_state,         // Always reset, this won't change
    handle_equal: apply_equal,          // Always evaluate, this won't change
    handle_number: first_number,        // First digit overwrites display
    handle_decimal: append_decimal,     // Can immediately append decimal to initial 0
    handle_zero: do_nothing,            // Zero does nothing, until a non-zero digit, or decimal is pressed
    handle_negate: do_nothing,          // Can not negate 0
    handle_operator: do_nothing,        // Nothing for operator to do until a number is entered
};

// Operator Selector, cycles through the sequence of operators
function select_operator_handler() {
    switch (state.handle_operator.name) {
        case 'do_nothing':
            return first_operator;
        case 'first_operator':
            return next_operator;
        case 'next_operator':
            return next_operator;
    }
}


let state = Object.create(initial_state);

function refresh_display() {
    elem = document.getElementById('display');
    elem.innerHTML = state.display_value;
}

refresh_display();


// Event Handlers
function handle_cancel_click() {
    state.handle_cancel();
    refresh_display();
}

function handle_negate_click() {
    state.handle_negate();
    refresh_display();
}

function handle_number_click(val) {
    state.handle_number(val);
    refresh_display();
}

function handle_zero_click(val) {
    state.handle_zero(val);
    refresh_display();
}

function handle_operator_click(val) {
    state.handle_operator(val)
    refresh_display();
}

function handle_percent_click() {
    alert('%');
}

function handle_decimal_click() {
    state.handle_decimal();
    refresh_display();
}

function handle_equal_click() {
    state.handle_equal();
    refresh_display();
}


// State Modifiers
function do_nothing() {
    return;
}

function reset_state() {
    state = Object.create(initial_state);
    refresh_display();
}

function apply_equal() {
    expression = state.value.toString() + state.operator + state.display_value;
    state.value = eval(expression);
    state.display_value = state.value.toString();
    state.handle_number = first_number;
    state.handle_decimal = append_decimal;
    return;
}

function negate_value() {
    state.display_value = state.display_value * -1;
    return;
}

function first_number(value) {
    state.display_value = value;
    state.handle_number = append_number;
    state.handle_operator = select_operator_handler();
    state.handle_decimal = append_decimal;
    state.handle_negate = negate_value;
    state.handle_zero = append_number;
    return;
}

function append_number(value) {
    state.display_value += value;
}


function first_operator(val) {
    state.operator = val;
    state.value = Number(state.display_value);
    common_operator_behaviour()
    return;
}

function next_operator(val) {
    expression = state.value.toString() + state.operator + state.display_value;
    state.value = eval(expression);
    common_operator_behaviour();
    return
}

function common_operator_behaviour() {
    state.display_value = state.value.toString();
    state.handle_number = first_number;
    state.handle_decimal = zero_decimal;
    state.handle_operator = select_operator_handler();
    return
}

function zero_decimal() {
    state.display_value = '0.';
    state.handle_number = append_number;
    state.handle_zero = append_number;
    state.handle_decimal = do_nothing();
}

function append_decimal() {
    state.display_value += '.';
    state.handle_number = append_number;
    state.handle_zero = append_number;
    state.handle_decimal = do_nothing();
}
