//------------------------------ Login ------------------------------

const formLogin = document.querySelector("#login-form")
// console.log(formLogin);
const messageDiv = document.querySelector('#message');


//----------------creation d'une class pour onglet login---
const loginnav = document.querySelectorAll('li');
console.log(loginnav);
loginnav[2].classList.add('btnlogin');

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const users = {
        email: e.target.querySelector('[name=email]').value,
        password: e.target.querySelector('[name=password]').value,

    }
    const chargeutile = JSON.stringify(users);
    
    async function userLogin() {
        try {
            const response = await fetch('http://localhost:5678/api/users/login ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: chargeutile
            });

            if (response.ok ) {
                const data = await response.json();
                // console.log(data.token);
               const token = data.token;
               localStorage.setItem('token',token);
                window.location.href= "../index.html"

            }
            
            else {
                const errorData = await response.json();
                console.log(errorData);
                messageDiv.textContent = ` "Erreur dans l'identifiant ou le mot de passe" `;

            }
        }

         catch (error) {
            messageDiv.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        }
    }
    userLogin()
});
