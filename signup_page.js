document.getElementById('userinfo').addEventListener('submit', async function (e) {
    e.preventDefault();

    if (validateForm()) {
        const formData = new FormData(this);

        const jsonFormData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('https://p5nt3w6ks3.execute-api.us-east-2.amazonaws.com/prod/email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsonFormData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log(result);
                window.location.href = 'index.html';
            } else {
                console.error('Error message:', result.Message);
                if (result.Message === 'Email already exists') {
                    addEmailExistsText();
                } if (result.Message === 'Username already exists') {
                    addUsernameExistsText();
                } else {
                    console.error('Error:', result.Message);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

function addEmailExistsText() {
    console.log('addEmailExistsText called'); // Debug statement
    let existingError = document.getElementById("email-exists-error");
    if (!existingError) {
        const newDiv = document.createElement("div");
        newDiv.id = "email-exists-error";
        newDiv.style.color = "red";
        newDiv.style.marginTop = "-20px";
        const newContent = document.createTextNode("This email already exists.");
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementsByName("email")[0];
        currentDiv.insertAdjacentElement('afterend', newDiv);
    }
}

function addUsernameExistsText() {
    console.log('addUsernameExistsText called'); // Debug statement
    let existingError = document.getElementById("username-exists-error");
    if (!existingError) {
        const newDiv = document.createElement("div");
        newDiv.id = "username-exists-error";
        newDiv.style.color = "red";
        newDiv.style.marginTop = "-20px";
        const newContent = document.createTextNode("This username already exists.");
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementsByName("username")[0];
        currentDiv.insertAdjacentElement('afterend', newDiv);
    }
}

function validateForm() {
    const password = document.getElementsByName("password")[0].value;
    const repeatPassword = document.getElementsByName("repeatPassword")[0].value;
    const email = document.getElementsByName("email")[0].value;
    const username = document.getElementsByName("username")[0].value;

    let valid = true;

    if (password !== repeatPassword) {
        addIncorrectPasswordText();
        valid = false;
    } else {
        let existingError = document.getElementById("password-error");
        if (existingError) {
            existingError.remove();
        }
    }

    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(validEmailRegex)) {
        addIncorrectEmailText();
        valid = false;
    } else {
        let existingError = document.getElementById("email-error");
        if (existingError) {
            existingError.remove();
        }
    }

    const validUsernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    if (!username.match(validUsernameRegex)) {
        addIncorrectUsernameText();
        valid = false;
    } else {
        let existingError = document.getElementById("username-error");
        if (existingError) {
            existingError.remove();
        }
    }

    return valid;
}

function addIncorrectPasswordText() {
    let existingError = document.getElementById("password-error");
    if (!existingError) {
        const newDiv = document.createElement("div");
        newDiv.id = "password-error";
        newDiv.style.color = "red";
        newDiv.style.marginTop = "-20px";
        const newContent = document.createTextNode("Please enter a valid password.");
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementsByName("repeatPassword")[0];
        currentDiv.insertAdjacentElement('afterend', newDiv);
    }
}

function addIncorrectEmailText() {
    let existingError = document.getElementById("email-error");
    if (!existingError) {
        const newDiv = document.createElement("div");
        newDiv.id = "email-error";
        newDiv.style.color = "red";
        newDiv.style.marginTop = "-20px";
        const newContent = document.createTextNode("Please enter a valid email.");
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementsByName("email")[0];
        currentDiv.insertAdjacentElement('afterend', newDiv);
    }
}

function addIncorrectUsernameText() {
    let existingError = document.getElementById("username-error");
    if (!existingError) {
        const newDiv = document.createElement("div");
        newDiv.id = "username-error";
        newDiv.style.color = "red";
        newDiv.style.marginTop = "-20px";
        const newContent = document.createTextNode("Please enter a valid username.");
        newDiv.appendChild(newContent);
        const currentDiv = document.getElementsByName("username")[0];
        currentDiv.insertAdjacentElement('afterend', newDiv);
    }
}
