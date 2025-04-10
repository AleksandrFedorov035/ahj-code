const moviesData = [
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
    const tableBody = document.querySelector('#table tbody');
    function createRow(movie) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${movie.id}</td>
        <td>${movie.title}</td>
        <td>(${movie.year})</td>
        <td>imdb: ${movie.imdb.toFixed(2)}</td>
      `;
      return row;
    }
    
    function renderTable(sortedData) {
      tableBody.innerHTML = '';
      sortedData.forEach(movie => {
        const row = createRow(movie);
        tableBody.appendChild(row);
      });
    }

    function sortData(field, direction) {
      const sortedData = [...moviesData];

      sortedData.sort((a, b) => {
        let valueA = a[field];
        let valueB = b[field];

        if (field === 'id' || field === 'year' || field === 'imdb') {
          return direction === 'asc' ? parseFloat(valueA) - parseFloat(valueB) : parseFloat(valueB) - parseFloat(valueA);
        } else {
          return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
      });
      return sortedData;
    }

    renderTable(moviesData);

    const headers = document.querySelectorAll('#table thead th');
    let currentSortField;
    let currentSortDirection = 'asc';
    const fieldMapping = {
      'ID': 'id',
      'Название': 'title',
      'Год': 'year',
      'IMDb': 'imdb'
    };

    headers.forEach(th => {
      th.addEventListener('click', () => {
        currentSortField = fieldMapping[th.textContent];
        currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';

        const sortedData = sortData(currentSortField, currentSortDirection);
        renderTable(sortedData);
      });
    });
})