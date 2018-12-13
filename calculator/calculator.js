initial_state = {
    display_value: "0",
    negative: false,

    handle_cancel: reset_state,
    handle_negate: make_negative,
    handle_number: first_number,
    handle_zero: do_nothing,
    handle_operator: do_nothing,
};


let state = Object.create(initial_state);

function refresh_display() {
    elem = document.getElementById('display');
    if (state.negative) {
        elem.innerHTML = "-" + state.display_value;
    } else {
        elem.innerHTML = state.display_value;
    }
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
    state.handle_zero();
    refresh_display();
}

function handle_operator_click(val) {
    alert(val);
}


function handle_function_click(val) {
    alert(val);
}

function handle_modifier_click(val) {
    alert(val);
}



// State Modifiers
function do_nothing() {
    return;
}

function make_negative() {
    state.negative = true;
    state.handle_negate = make_positive;
    return;
}

function make_positive() {
    state.negative = false;
    state.handle_negate = make_negative;
    return;
}


function reset_state() {
    state = Object.create(initial_state);
    refresh_display();
}

function first_number(value) {
    state.display_value = value;
    state.handle_number = append_number;
}

function append_number(value) {
    state.display_value += value;
}
