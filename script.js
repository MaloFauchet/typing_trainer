let azerty_keyboard = [
    '²', '&', '1', 'é', '2', '"', '3', "'", '4', '(', '5', '-', '6', 'è', '7', '_', '8', 'ç', '9', 'à', '0', ')', '°', '=', '+', 'Backspace', '\n',
    'Tab', 'A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '^', '¨', '$', '£', 'Delete', '\n',
    'CapsLock', 'Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'ù', '%', '*', 'µ', 'Enter', '\n',
    'Shift', '<', '>', 'W', 'X', 'C', 'V', 'B', 'N', ',', '?', ';', '.', ':', '/', '!', '§', 'Shift', '\n',
    'Ctrl', 'Fn', 'Alt', 'Space', 'Alt', 'Ctrl', '\n'
];

let capslock_active = false;

let html_keyboard = document.getElementById('keyboard');
let keyboard_conf_index = 0;
let last_element;
let first_shift = true;
let current_div = document.createElement('div');
current_div.classList.add('line');
for (let i = 0; i < azerty_keyboard.length; i++) {
    let element = azerty_keyboard[i];
    
    if (element == '\n') {
        last_element.classList.add('lastitem');
        html_keyboard.appendChild(current_div);
        current_div = document.createElement('div');
        current_div.classList.add('line');
        continue;
    }
    let key = document.createElement('li');
    if (element.length === 1 && element.match('[A-Z]')) {
        // key.classList.add('letter');
        // key.id = element;
        // key.setAttribute('data-key', element);
        // key.textContent = element;
        // html_keyboard.appendChild(key);
        key.classList.add('letter');
        key.setAttribute('data-key', element);
        key.id = element;
        let span_maj_off = document.createElement('span');
        span_maj_off.classList.add('majOff');
        span_maj_off.textContent = element.toLocaleLowerCase();
        let span_maj_on = document.createElement('span');
        span_maj_on.classList.add('majOn');
        element = azerty_keyboard[i];
        span_maj_on.textContent = element;
        key.appendChild(span_maj_off);
        key.appendChild(span_maj_on);
        current_div.appendChild(key);
    }
    else if (element.match('²|Ctrl|Fn|Alt')) {
        key.classList.add('special');
        key.id = element;
        key.setAttribute('data-key', (element === 'Ctrl') ? 'Control' : element);
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('Backspace')) {
        key.classList.add('backspace');
        key.setAttribute('data-key', 'Backspace');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('Tab')) {
        key.classList.add('tab');
        key.setAttribute('data-key', 'Tab');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('CapsLock')) {
        key.classList.add('capslock');
        key.setAttribute('data-key', 'CapsLock');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('Delete')) {
        key.classList.add('delete');
        key.setAttribute('data-key', 'Delete');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('Shift')) {
        if (first_shift) {
            key.classList.add('left-shift');
            first_shift = false;
        } else {
            key.classList.add('rigth-shift');
        }
        key.setAttribute('data-key', 'Shift');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('Enter')) {
        key.classList.add('enter');
        key.setAttribute('data-key', 'Enter');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else if (element.match('Space')) {
        key.classList.add('space');
        key.setAttribute('data-key', ' ');
        key.textContent = element;
        current_div.appendChild(key);
    }
    else {
        key.classList.add('symbol');
        key.setAttribute('data-key', element);
        if (last_element.classList.contains('majOff')) {
            key.classList.add('majOn');
        } else {
            key.classList.add('majOff');
        }
        key.textContent = element;
        current_div.appendChild(key);

    }
    last_element = key;
}

onkeydown = function (e) {
    console.log(e.key); 
    if (e.key === 'CapsLock') {
        capslock_active = !capslock_active;
        if (capslock_active) {
            setMajActive();
            document.querySelector('.capslock').classList.add('active');
        } else {
            setMajInactive();
            document.querySelector('.capslock').classList.remove('active');
        }
    }
    if (e.key === 'Shift') {
        shiftAction();
        document.querySelector('.left-shift').classList.add('active');
        document.querySelector('.rigth-shift').classList.add('active');
    }
    let key = document.querySelectorAll(`li[data-key="${e.key.toLocaleUpperCase()}"]`);
    key.forEach(element => {
        element.classList.add('active');
    });
}

onkeyup = function (e) {
    let key = document.querySelectorAll(`li[data-key="${e.key.toUpperCase()}"]`);
    if (e.key === 'Shift') {
        shiftAction(true);
        document.querySelector('.left-shift').classList.remove('active');
        document.querySelector('.rigth-shift').classList.remove('active');
    }
    key.forEach(element => {
        element.classList.remove('active');
    });
}

function shiftAction(deactivate = false) {
    if (!deactivate) {
        if (capslock_active) {
            setMajInactive();
        } else {
            setMajActive();
        }
        return;
    }
    if (capslock_active) {
        setMajActive();
    } else {
        setMajInactive();
    }
}

function setMajActive() {
    let maj = document.querySelectorAll('.majOff');
    maj.forEach(element => {
        element.style.display = 'none';
    });
    maj = document.querySelectorAll('.majOn');
    maj.forEach(element => {
        element.style.display = 'block';
    });
}

function setMajInactive() {
    let maj = document.querySelectorAll('.majOff');
    maj.forEach(element => {
        element.style.display = 'block';
    });
    maj = document.querySelectorAll('.majOn');
    maj.forEach(element => {
        element.style.display = 'none';
    });
}