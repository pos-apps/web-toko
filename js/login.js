(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('login-form');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else if (form.checkValidity() === true) {
                    event.preventDefault();
                    event.stopPropagation();

                    let username = document.getElementById('input-username').value;
                    let password = document.getElementById('input-password').value;

                    axios.post('http://localhost:3000/authentication/login', {
                        username: username,
                        password: password
                    }).then(function (response) {
                        console.log(response.data);
                        if (response.data.status == "Error") {
                            Swal.fire({
                                type: 'error',
                                title: 'Gagal Login...',
                                text: 'Username atau Password salah...'
                            })
                        } else if (response.data.Status == "Login berhasil!") {
                            console.log(response.data.data);
                            if (typeof (Storage) !== undefined) {
                                window.localStorage.setItem('OAuth2_PassTok', JSON.stringify(response.data.data));
                            } else {
                                console.log('Web Browser tidak support local storage');
                            }
                        }
                    }).catch(function (err) {
                        console.log(err);
                    })
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();