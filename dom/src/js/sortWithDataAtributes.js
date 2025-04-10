const moviesData1 = [
    {
        "id": 26,
        "title": "Побег из Шоушенка",
        "imdb": 9.30,
        "year": 1994
    },
    {
        "id": 25,
        "title": "Крёстный отец",
        "imdb": 9.20,
        "year": 1972
    },
    {
        "id": 27,
        "title": "Крёстный отец 2",
        "imdb": 9.00,
        "year": 1974
    },
    {
        "id": 1047,
        "title": "Тёмный рыцарь",
        "imdb": 9.00,
        "year": 2008
    },
    {
        "id": 223,
        "title": "Криминальное чтиво",
        "imdb": 8.90,
        "year": 1994
    }
]

document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector('#movies-table tbody')
    const headers = document.querySelectorAll('#movies-table thead th');

    function createElement(movie) {
        const row = document.createElement('tr')

        row.dataset.id = movie.id
        row.dataset.title = movie.title
        row.dataset.year = movie.year
        row.dataset.imdb = movie.imdb.toFixed(2)

        const cells = [
            `<td>${movie.id}</td>`,
            `<td>${movie.title}</td>`,
            `<td>(${movie.year})</td>`,
            `<td>imdb: ${movie.imdb.toFixed(2)}</td>`
        ]

        row.innerHTML = cells.join('')
        return row
    }

    moviesData1.forEach(movie => {
        const row = createElement(movie);
        tableBody.appendChild(row);
    });

    function sortRows() {
        const rows = Array.from(document.querySelectorAll('#movies-table tbody tr'));
        let currentSortField;
        let currentSortDirection = 'asc';

        headers.forEach(th => {
            th.addEventListener('click', () => {
                currentSortField = th.dataset.sortBy;
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';

                rows.sort((a, b) => {
                    const valueA = a.dataset[currentSortField];
                    const valueB = b.dataset[currentSortField];

                    if (currentSortField === 'id' || currentSortField === 'year') {
                        return currentSortDirection === 'asc' ? parseFloat(valueA) - parseFloat(valueB) : parseFloat(valueB) - parseFloat(valueA);
                    } else {
                        return currentSortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
                    }
                });
                
                tableBody.innerHTML = '';
                rows.forEach(row => tableBody.appendChild(row));
            });
        });
    }
    sortRows();
})