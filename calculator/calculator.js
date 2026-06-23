let state = {
    value: 0,
    display_value: '0',
    operator: null,
    last_operator: null,
    last_operand: null,
};

function refresh_display() {
    document.getElementById('display').innerHTML = state.display_value;
}

function enter(named_state) {
    Object.assign(state, named_state);
    update_state_display();
}

// Event handlers — called from HTML
function handle_cancel_click()      { state.handle_cancel();      refresh_display(); }
function handle_negate_click()      { state.handle_negate();      refresh_display(); }
function handle_number_click(val)   { state.handle_number(val);   refresh_display(); }
function handle_zero_click(val)     { state.handle_zero(val);     refresh_display(); }
function handle_operator_click(val) { state.handle_operator(val); refresh_display(); }
function handle_percent_click()     { state.handle_percent();     refresh_display(); }
function handle_decimal_click()     { state.handle_decimal();     refresh_display(); }
function handle_equal_click()       { state.handle_equal();       refresh_display(); }

// Shared primitives
function do_nothing() {}

function cancel() {
    state.value = 0;
    state.display_value = '0';
    state.operator = null;
    state.last_operator = null;
    state.last_operand = null;
    enter(initial);
}

function append_number(v) {
    state.display_value += v;
}

function negate_value() {
    state.display_value = (state.display_value * -1).toString();
}

// LHS entry
function start_lhs_number(v) {
    state.display_value = v;
    enter(entering_lhs);
}

function start_lhs_decimal() {
    state.display_value = '0.';
    enter(entering_lhs_no_decimal);
}

function lhs_decimal() {
    state.display_value += '.';
    enter(entering_lhs_no_decimal);
}

function apply_lhs_operator(op) {
    state.value = Number(state.display_value);
    state.operator = op;
    state.display_value = state.value.toString();
    enter(post_operator);
}

function apply_percent() {
    state.display_value += '%';
    enter(percent_lhs);
}

// Operator chaining
function change_operator(op) {
    state.operator = op;
    enter(post_operator);
}

// RHS entry
function start_rhs_number(v) {
    state.display_value = v;
    enter(entering_rhs);
}

function start_rhs_decimal() {
    state.display_value = '0.';
    enter(entering_rhs_no_decimal);
}

function rhs_decimal() {
    state.display_value += '.';
    enter(entering_rhs_no_decimal);
}

// Evaluation
const operations = { '+': (a, b) => a + b, '-': (a, b) => a - b, '*': (a, b) => a * b, '/': (a, b) => a / b };
function calculate(a, op, b) { return operations[op](Number(a), Number(b)); }

function evaluate_and_continue(op) {
    state.value = calculate(state.value, state.operator, state.display_value);
    state.operator = op;
    state.display_value = state.value.toString();
    enter(post_operator);
}

function evaluate_and_end() {
    state.last_operator = state.operator;
    state.last_operand = state.display_value;
    state.value = calculate(state.value, state.operator, state.display_value);
    state.display_value = state.value.toString();
    enter(post_equal);
}

function repeat_equal() {
    state.value = calculate(state.value, state.last_operator, state.last_operand);
    state.display_value = state.value.toString();
    enter(post_equal);
}

function start_zero() {
    state.display_value = '0';
    enter(initial);
}

function apply_rhs_percent() {
    state.display_value += '%';
    enter(percent_rhs);
}

function evaluate_rhs_percent() {
    const rhs = state.value * Number(state.display_value.slice(0, -1)) / 100;
    state.value = calculate(state.value, state.operator, rhs);
    state.display_value = state.value.toString();
    enter(post_equal);
}

function evaluate_percent() {
    state.value = Number(state.display_value.slice(0, -1)) / 100;
    state.display_value = state.value.toString();
    enter(post_equal);
}

// Named states — each defines the complete handler set
const initial = {
    _name: 'Initial',
    handle_cancel:   cancel,
    handle_equal:    do_nothing,
    handle_percent:  do_nothing,
    handle_number:   start_lhs_number,
    handle_decimal:  start_lhs_decimal,
    handle_zero:     do_nothing,
    handle_negate:   do_nothing,
    handle_operator: do_nothing,
};

const entering_lhs = {
    _name: 'Entering LHS',
    handle_cancel:   cancel,
    handle_equal:    do_nothing,
    handle_percent:  apply_percent,
    handle_number:   append_number,
    handle_decimal:  lhs_decimal,
    handle_zero:     append_number,
    handle_negate:   negate_value,
    handle_operator: apply_lhs_operator,
};

const entering_lhs_no_decimal = {
    ...entering_lhs,
    _name: 'Entering LHS (decimal set)',
    handle_decimal:  do_nothing,
};

const post_operator = {
    _name: 'Operator set',
    handle_cancel:   cancel,
    handle_equal:    do_nothing,
    handle_percent:  do_nothing,
    handle_number:   start_rhs_number,
    handle_decimal:  start_rhs_decimal,
    handle_zero:     start_rhs_number,
    handle_negate:   do_nothing,
    handle_operator: change_operator,
};

const entering_rhs = {
    _name: 'Entering RHS',
    handle_cancel:   cancel,
    handle_equal:    evaluate_and_end,
    handle_percent:  apply_rhs_percent,
    handle_number:   append_number,
    handle_decimal:  rhs_decimal,
    handle_zero:     append_number,
    handle_negate:   negate_value,
    handle_operator: evaluate_and_continue,
};

const entering_rhs_no_decimal = {
    ...entering_rhs,
    _name: 'Entering RHS (decimal set)',
    handle_decimal:  do_nothing,
};

const percent_rhs = {
    _name: 'RHS Percent',
    handle_cancel:   cancel,
    handle_equal:    evaluate_rhs_percent,
    handle_percent:  do_nothing,
    handle_number:   do_nothing,
    handle_decimal:  do_nothing,
    handle_zero:     do_nothing,
    handle_negate:   do_nothing,
    handle_operator: do_nothing,
};

const percent_lhs = {
    _name: 'LHS Percent',
    handle_cancel:   cancel,
    handle_equal:    evaluate_percent,
    handle_percent:  do_nothing,
    handle_number:   do_nothing,
    handle_decimal:  do_nothing,
    handle_zero:     do_nothing,
    handle_negate:   do_nothing,
    handle_operator: do_nothing,
};

const post_equal = {
    _name: 'Result',
    handle_cancel:   cancel,
    handle_equal:    repeat_equal,
    handle_percent:  do_nothing,
    handle_number:   start_lhs_number,
    handle_decimal:  start_lhs_decimal,
    handle_zero:     start_zero,
    handle_negate:   negate_value,
    handle_operator: apply_lhs_operator,
};

// State panel — educational display

const ALL_STATES = [
    initial, entering_lhs, entering_lhs_no_decimal,
    post_operator, entering_rhs, entering_rhs_no_decimal,
    percent_lhs, percent_rhs, post_equal,
];

const BUTTON_LABELS = {
    handle_number:   '1 – 9',
    handle_zero:     '0',
    handle_decimal:  '.',
    handle_operator: '+ − × ÷',
    handle_equal:    '=',
    handle_negate:   '+/−',
    handle_percent:  '%',
    handle_cancel:   'AC',
};

const ACTION_LABELS = {
    do_nothing:            '—',
    cancel:                'Reset',
    append_number:         'Append digit',
    negate_value:          'Negate',
    start_lhs_number:      'Start number',
    start_lhs_decimal:     'Start 0.',
    lhs_decimal:           'Append decimal',
    apply_lhs_operator:    'Store & set operator',
    apply_percent:         'Append %',
    change_operator:       'Change operator',
    start_rhs_number:      'Start number',
    start_rhs_decimal:     'Start 0.',
    rhs_decimal:           'Append decimal',
    evaluate_and_continue: 'Evaluate, next operator',
    evaluate_and_end:      'Evaluate',
    evaluate_rhs_percent:  'Evaluate with %',
    evaluate_percent:      'Evaluate as %',
    repeat_equal:          'Repeat last op',
    start_zero:            'Start zero',
    apply_rhs_percent:     'Append %',
};

function update_state_display() {
    document.querySelectorAll('.state-item').forEach(el => {
        el.classList.toggle('current', el.dataset.name === state._name);
    });

    const details = document.getElementById('handler_details');
    if (!details) return;

    const rows = Object.entries(BUTTON_LABELS).map(([key, label]) => {
        const fn = state[key];
        const action = ACTION_LABELS[fn && fn.name] || '—';
        const cls = (fn && fn !== do_nothing) ? 'active-handler' : 'inactive-handler';
        return `<tr class="${cls}"><td>${label}</td><td>${action}</td></tr>`;
    });
    details.innerHTML = `<table class="handler-table"><tbody>${rows.join('')}</tbody></table>`;
}

function init_state_panel() {
    const list = document.getElementById('state_list');
    if (!list) return;
    list.innerHTML = ALL_STATES
        .map(s => `<div class="state-item" data-name="${s._name}">${s._name}</div>`)
        .join('');
    update_state_display();
}

// Boot
enter(initial);
refresh_display();
init_state_panel();
