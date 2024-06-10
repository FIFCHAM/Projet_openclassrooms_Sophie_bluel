//------------------------------ Login ------------------------------

const formLogin = document.querySelector("#login-form")
console.log(formLogin);
const messageDiv = document.querySelector('#message')

 
                        formLogin.addEventListener("submit", function(e){
                            e.preventDefault();
                            const users ={
                                email: e.target.querySelector('[name=email]').value,
                                password : e.target.querySelector('[name=password]').value,
                                
                                }
                                const chargeutile = JSON.stringify(users);
                                console.log(chargeutile);
                                async function userLogin() {
                                    
                                
                                try {
                                    const response = await fetch('http://localhost:5678/api/users/login ', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                            },
                                            body: chargeutile
                                            });
                                            
                                            if (response.ok) {
                                                const data = await response.json();
                                                // Redirection vers la page d'accueil ou une autre action après la connexion réussie
                                                window.location.href = '../index.html';
                                                } else {
                                                    const errorData = await response.json();
                                                    messageDiv.textContent = errorData.message && 'Mot de passe ou adresse email non-valide';
                                                    
                                                    }
                                                    }catch (error) {
                                                        messageDiv.textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
                                }                    }
                                userLogin()   
        });
