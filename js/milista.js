document.addEventListener('DOMContentLoaded', function () {
    // Realizar la solicitud GET al servidor backend
    fetch('http://localhost:3000/peliculas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos de las películas obtenidos correctamente:', data);

        const lista = document.getElementById("Milista");
        lista.innerHTML = "";

        data.forEach(movie => {
            console.log('Datos de la película:', movie);
            const itemLista = document.createElement("li");
            itemLista.className = "list-group-item";
            itemLista.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}</p>
                </div>
                <button class="btn btn-dark btndelete align-self-start" data-movieid="${movie.id}"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button>
            </div>
        `;
            lista.appendChild(itemLista);
        });

        
        const deleteButtons = document.querySelectorAll('.btndelete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function () {
                const movieId = this.dataset.movieid;
                
                fetch(`http://localhost:3000/peliculas/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    this.closest('.list-group-item').remove();
                    console.log('Película eliminada correctamente:', data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
