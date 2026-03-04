/**
 * Survey Form Validation
 * Warren Macalino
 * March 4, 2026
 */

const form = document.getElementById('userForm');

form.addEventListener('submit', function(event){
    const errorMessage = document.querySelectorAll('.error-message');
    for (const message of errorMessage) {
        message.textContent = '';
    }

    const errorInputs = document.querySelectorAll('.input-error');
    for (const input of errorInputs) {
        input.classList.remove('input-error');
    }

    const validFormCheck= validateForm()

    if (!validFormCheck) {
        event.preventDefault();
    }
});

form.addEventListener('input', function(event) {
    const activeInput = event.target;

    if (activeInput.classList.contains('input-error')) {
        activeInput.classList.remove('input-error');
    }

    const container = activeInput.closest('.input-container');

    if (container) {
        const errorMessage = container.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = '';
        }
    }
});

function displayError(inputElement, message) {
    inputElement.classList.add('input-error');

    const errorSpan = document.getElementById(inputElement.id + '-error');

    if (errorSpan) {
        errorSpan.textContent = message;
    }
}

function validateForm() {
    let isValid = true;

    const firstName = document.getElementById('first-name')

    if (firstName.value.trim() === '') {
        displayError(firstName, 'First name is required.');
            isValid = false;
    }

    const lastName = document.getElementById('last-name')

    if (lastName.value.trim() === '') {
        displayError(lastName, 'Last name is required.');
            isValid = false;
    }

    const eMail = document.getElementById('email');
    const eMailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (eMail.value.trim() === '') {
        displayError(eMail, 'Email is required.')
        isValid = false;
    } else if (!eMailPattern.test(eMail.value)) {
        displayError(eMail, 'Please enter a valid email address.');
        isValid = false;
    }

    const projectType = document.getElementById('project-type')

    if (projectType.value.trim() === '') {
        displayError(projectType, 'Please select an option.')
        isValid = false;
    }

    const vocalFieldset = document.getElementById('vocal-options');
    const selectedVocalOption = document.querySelector('input[name="vocal-handling"]:checked');

    if (!selectedVocalOption) {
        displayError(vocalFieldset, 'Please select at least one option.')
        isValid = false;
    }

    const dateInput = document.getElementById('target-date');
    
    if (dateInput.value === "") {
        displayError(dateInput, 'Please select a date from the calendar.')
        isValid = false;
    } else {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
            displayError(dateInput, 'You can\'t start in the future! Please pick a past date.')
            isValid = false;
        }
    }
    
    const promoCode = document.getElementById('promo-code');
    const promoPattern = /^BEAT-\d{4}-[A-Z]{3}$/;

    if (promoCode.value.trim() !== '' && !promoPattern.test(promoCode.value.trim())) {
        displayError(promoCode, 'Format must be BEAT-YYYY-ABC (e.g., BEAT-2026-XHW).');
        isValid = false;
    }

    return isValid;
}