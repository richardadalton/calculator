initial_state = {
    value: 0,
    display_value: "0",
    operator: null,

    handle_cancel: reset_state,
    handle_negate: do_nothing,
    handle_number: first_number,
    handle_zero: do_nothing,
    handle_operator: do_nothing,
    handle_decimal: append_decimal,
    handle_equal: apply_equal,
};


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

function negate_value() {
    state.display_value = state.display_value * -1;
    console.log(state.value)
    console.log(state.display_value)
    return;
}

function first_number(value) {
    state.display_value = value;
    state.handle_number = append_number;
    state.handle_operator = apply_operator;
    state.handle_decimal = append_decimal;
    state.handle_negate = negate_value;
    state.handle_zero = append_number;
}

function apply_operator(val) {
    if (state.operator) {
        expression = state.value.toString() + state.operator + state.display_value;
        state.value = eval(expression);
        state.display_value = state.value.toString();
    }

    state.operator = val;
    state.value = Number(state.display_value);
    state.handle_number = first_number;
    state.handle_decimal = zero_decimal;
    return;
}

function apply_equal() {
    expression = state.value.toString() + state.operator + state.display_value;
    console.log(expression);

    state.value = eval(expression);
    state.display_value = state.value.toString();
    state.handle_number = first_number;
    state.handle_decimal = do_nothing;
    return;
}

function append_number(value) {
    state.display_value += value;
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
