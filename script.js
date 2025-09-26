const STAR_WARS_API_URL = 'https://swapi.dev/api/people/';

document.getElementById('fetchButton').addEventListener('click', () => {
    fetchCharacters();
});

const fetchCharacters = async () => {
    try {
        const response = await fetch(STAR_WARS_API_URL);
        const data = await response.json();
        const characters = data.results;

        const list = document.getElementById('characterList');
        list.innerHTML = ''; // Töröljük az előző tartalmat

        // Minden karakter
        for (const character of characters) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${character.name}</strong>`;

            // Extra: karakter filmek
            if (character.films.length > 0) {
                const filmList = document.createElement('ul');
                
                // Lekérjük az egyes filmek címét
                for (const filmURL of character.films) {
                    const filmResponse = await fetch(filmURL);
                    const filmData = await filmResponse.json();
                    const filmLi = document.createElement('li');
                    filmLi.innerText = filmData.title;
                    filmList.appendChild(filmLi);
                }

                li.appendChild(filmList);
            }

            list.appendChild(li);
        }
    } catch (error) {
        console.error('Hiba történt:', error);
        alert('Hiba a karakterek lekérésekor.');
    }
};
