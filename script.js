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
    } else if (element === '\"') {
        key.classList.add('symbol');
        key.setAttribute('data-key', "quote");
        if (last_element.classList.contains('majOff')) {
            key.classList.add('majOn');
        } else {
            key.classList.add('majOff');
        }
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
        shiftAction();
    }
    if (e.key === 'Shift') {
        shiftAction();
        document.querySelector('.left-shift').classList.add('active');
        document.querySelector('.rigth-shift').classList.add('active');
    } else if (e.key === 'Enter') {
        document.querySelector('.enter').classList.add('active');
    } else if (e.key === 'Backspace') {
        document.querySelector('.backspace').classList.add('active');
    } else if (e.key === 'Tab') {
        e.preventDefault();
        document.querySelector('.tab').classList.add('active');
    } else if (e.key === 'Delete') {
        document.querySelector('.delete').classList.add('active');
    } else if (e.key === 'é') {
        document.querySelector('li[data-key="é"]').classList.add('active');
    } else if (e.key === '\"') {
        document.querySelector('li[data-key="quote"]').classList.add('active');
    } else if (e.key === 'Control') {
        document.querySelectorAll('li[data-key="Control"]').forEach((elem) => {
            elem.classList.add('active');
        });
    } else if (e.key === 'Alt') {
        e.preventDefault();
        document.querySelectorAll('li[data-key="Alt"]').forEach((elem) => {
            elem.classList.add('active');
        });
    }
    let key = document.querySelectorAll(`li[data-key="${e.key.toLocaleUpperCase()}"]`);
    key.forEach(element => {
        element.classList.add('active');
    });
    handleKeyboardInput(e.key);
}

onkeyup = function (e) {
    let key;
    if (e.key === '\"') {
        key = "quote";
    } 
    if (e.key === 'Shift') {
        shiftAction(true);
        document.querySelector('.left-shift').classList.remove('active');
        document.querySelector('.rigth-shift').classList.remove('active');
    } else if (e.key === 'Enter') {
        document.querySelector('.enter').classList.remove('active');
    } else if (e.key === 'Backspace') {
        document.querySelector('.backspace').classList.remove('active');
    } else if (e.key === 'Tab') {
        e.preventDefault();
        document.querySelector('.tab').classList.remove('active');
    } else if (e.key === 'Delete') {
        document.querySelector('.delete').classList.remove('active');
    } else if (e.key === 'é') {
        document.querySelector('li[data-key="é"]').classList.remove('active');
    } else if (e.key === '\"') {
        document.querySelector('li[data-key="quote"]').classList.remove('active');
    } else if (e.key === 'Control') {
        document.querySelectorAll('li[data-key="Control"]').forEach((elem) => {
            elem.classList.remove('active');
        });
    } else if (e.key === 'Alt') {
        document.querySelectorAll('li[data-key="Alt"]').forEach((elem) => {
            elem.classList.remove('active');
        });
    }
    document.querySelectorAll(`li[data-key="${e.key.toUpperCase()}"]`).forEach(element => {
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

// ---------- KEYBOARD CREATION FINISHED ---------- //
//--------------------------------------------------//
let exo = {
    "1": "jfjf jf fjj jfff fjjf fj",
    "2": "fj fjjfj fjfjffjf jjf jfjjd fjfjjffj",
    "3": "kd kdd dk dkk dkkd kdk dk",
    "4": "dkdk dkd ddkdk kkddk kdkkk dkdddkkd",
    "5": "jfkd fjdjkjfdjk jfkjf dkj"
}
let exo_number = document.location.href.split("#")[1];
if (exo_number === undefined) {
    exo_number = 1;
    history.replaceState(null, "", "#exo=" + exo_number);
} else {
    exo_number = parseInt(exo_number.split("=")[1]);
    if (isNaN(exo_number) || exo_number < 1 || exo_number > Object.keys(exo).length) {
        exo_number = 1;
        history.replaceState(null, "", "#exo=" + exo_number);
    }
}
document.getElementById('exo-number').innerHTML = exo_number;

let text = exo[exo_number];
if (text === undefined) {
    text = "Aucun exercice trouvé";
}
let current_letter = 0;
let letters = text.split("");
let exo_text_html = document.getElementById('exo-text');
let nb_errors = 0;
let nb_errors_html = document.getElementsByClassName('nb-errors');
let is_finished = false;

function updateNbErrors() {
    for (let i = 0; i < nb_errors_html.length; i++) {
        const element = nb_errors_html[i];
        element.innerHTML = nb_errors;
    }
    // nb_errors_html.innerHTML = nb_errors;
}

function updateCurrentLetter() {
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        
        let letter_html = document.createElement('span');
        if (i === current_letter) {
            let cursor = document.createElement('span');
            cursor.classList.add('cursor');
            cursor.textContent = '|';
            exo_text_html.appendChild(cursor);

            letter_html.classList.add('current-letter');
        } else if (i < current_letter) {
            letter_html.classList.add('letter-done');
        } else {
            letter_html.classList.add('letter-to-do');
        }
        letter_html.innerHTML = letter;
        exo_text_html.appendChild(letter_html);
    }
}

function handleKeyboardInput(key) {
    if (!is_finished) {
        if (key === 'Backspace') {
            if (current_letter > 0) {
                current_letter--;
            }
        } else {
            if (key === letters[current_letter]) {
                current_letter++;
            } else {
                nb_errors++;
            }
        }
        updateNbErrors();
        exo_text_html.innerHTML = '';
        updateCurrentLetter();
    }
    if (current_letter === letters.length) {
        finished();
    }
}

function finished() {
    if (nb_errors <= 3) {
        document.getElementsByClassName('success')[0].style.display = 'block';
        let ex_suivant = document.getElementById('ex-suivant');
        if (exo_number === Object.keys(exo).length) {
            alert("Bravo, vous avez terminé tous les exercices !");
            ex_suivant.style.display = 'none';
        } else {
            ex_suivant.href = "#exo=" + (exo_number + 1);
            ex_suivant.style.display = 'inline-block';
        }
    } else {
        document.getElementsByClassName('failure')[0].style.display = 'block';
    }

    let reessayer = document.getElementById('ex-reessayer');
    reessayer.href = "#exo=" + exo_number;
    reessayer.onclick = function() {
        location.reload();
    }
    reessayer.style.display = 'inline-block';
    is_finished = true;
}






// exo_text_html.innerHTML = text;
updateCurrentLetter();

updateNbErrors();
