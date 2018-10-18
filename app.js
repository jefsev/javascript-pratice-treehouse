document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registrar');
    const input = form.querySelector('input');

    const mainDiv = document.querySelector('.main');
    const ul = document.getElementById('invitedList');

    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckbox = document.createElement('input');

    filterLabel.textContent = "Hide those who haven't responded";
    filterCheckbox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckbox);
    mainDiv.insertBefore(div, ul);

    filterCheckbox.addEventListener('change', (e) => {
        const isChecked = e.target.checked;
        const lis = ul.children;

        if (isChecked) {
            for (let i = 0; i < lis.length; i += 1){
                let li = lis[i];
                if (li.className === 'responded') {
                    li.style.display = '';
                } else {
                    li.style.display = 'none';
                }
            }
        } else {
            for (let i = 0; i < lis.length; i += 1){
                let li = lis[i];
                li.style.display = '';
            }
        }
    });

    function createLi(text) {
        function createElement(eleName, prop, val) {
            const element = document.createElement(eleName);
            element[prop] = val;
            return element;
        }

        function appendToLi(eleName, prop, val) {
            const element = createElement(eleName, prop, val);
            li.appendChild(element);
            return element;
        }

        const li = document.createElement('li');
        appendToLi('span', 'textContent', text);
        const label = appendToLi('label', 'textContent', 'Confirmed');
        const checkbox = createElement('input', 'type', 'checkbox');
        label.appendChild(checkbox);
        appendToLi('button', 'textContent', 'edit');
        appendToLi('button', 'textContent', 'remove');
        return li;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value;
        const inputField = document.querySelector('input[type=text]');

        if (text == ''){
            inputField.placeholder = 'ERROR please fill in this field';
            return;
        }
        input.value = 'Invite Someone';

        const li = createLi (text);

        ul.appendChild(li);
    });

    ul.addEventListener('change', (e) => {
        const checkbox = event.target;
        const checked = checkbox.checked;
        const listItem = checkbox.parentNode.parentNode;

        if (checked){
        listItem.className = 'responded';
        } else {
        listItem.className = '';
        }
    });

    ul.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const button = e.target;
            const li = button.parentNode;
            const ul = li.parentNode;
            const action = button.textContent;

            const nameActions = {
                remove: () => {
                    ul.removeChild(li);
                },
                edit: () => {
                    const span = li.firstElementChild;
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = span.textContent;
                    li.insertBefore(input, span);
                    li.removeChild(span);
                    button.textContent = 'save';
                },
                save: () => {
                    const input = li.firstElementChild;
                    const span = document.createElement('span');
                    span.textContent = input.value;
                    li.insertBefore(span, input);
                    li.removeChild(input);
                    button.textContent = 'edit';  
                }
            }
            // select and run action in buttons name
            nameActions[action]();
        }
    })
});