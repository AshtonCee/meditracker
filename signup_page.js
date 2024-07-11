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
                console.log(result);

                window.location.href = 'index.html'
                
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });


        function validateForm() {
            const password = document.getElementsByName("password")[0].value;
            const repeatPassword = document.getElementsByName("repeatPassword")[0].value;
            const email = document.getElementsByName("email")[0].value;

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

            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!email.match(validRegex)) {
                addIncorrectEmailText();
                valid = false;
            } else {
                let existingError = document.getElementById("email-error");
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