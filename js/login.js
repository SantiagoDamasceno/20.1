document.getElementById('submitlogin').addEventListener('click', function () {

    const username = document.getElementById('typeUsername').value;
    const password = document.getElementById('typePassword').value;
    const japflixuser = {
        name: username,
        pass: password
    }
    
    if (username == "admin" && password == "1234") {
        location.href = "index.html";
        localStorage.setItem("japflixuser", JSON.stringify(japflixuser));
    } else {
        alert('usuario y/o contraseña incorrectos')
    }
    
    });
    