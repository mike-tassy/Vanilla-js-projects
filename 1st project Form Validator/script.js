const form = document.getElementById('form'); 
const username = document.getElementById('username'); 
const email = document.getElementById('email'); 
const password = document.getElementById('password'); 
const password2 = document.getElementById('password2'); 


//show input error message
function showError(input, message) {
    const formControl = input.parentElement
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message
}

//show success outline
function showSuccess(input) {
    const formControl = input.parentElement
    formControl.className = 'form-control success';
}

// check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()\[\]\\.,;:\s@"]+\.)+[^<>()\[\]\\.,;:\s@"]{2,})$/i;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}


// check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    })
}

//check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
    else {
        showSuccess(input);
    }
}

//check password
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

//get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners

form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form submission


    // Reworking for scalability and maintainability
    // if(username.value === '') {
    //     showError(username, 'Username is required');
    // }
    // else {
    //     showSuccess(username);
    // }

    
    // if(email.value === '') {
    //     showError(email, 'email is required');
    // }
    // else if (isvalidEmail(email.value) === false) {
    //     showError(email, 'Email is not valid')
    // }
    // else {
    //     showSuccess(email);
    // }

    
    // if(password.value === '') {
    //     showError(password, 'Password is required');
    // }
    // else {
    //     showSuccess(password);
    // }

    
    // if(password2.value === '') {
    //     showError(password2, 'password2 is required');
    // }
    // else {
    //     showSuccess(password2);
    // }

    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 20);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})