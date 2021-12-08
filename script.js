$(document).ready(() => {
    let savedMovies = JSON.parse(localStorage.getItem('movies'));
    let movies = savedMovies ? savedMovies : [];

    function displayMovies(movies) {
        movies.forEach(movie => {
            let $table = $('table');
            let $tr = $('<tr>');
            let $title = $('<td>', { text: movie.title });
            let $rating = $('<td>', { text: movie.rating });
            let $deleteBtn = $('<button>', { text: 'Delete', class: 'delete' });
            let $tdDelete = $('<td>');
            $tdDelete.append($deleteBtn);
    
            $tr.append($title);
            $tr.append($rating);
            $tr.append($tdDelete);
    
            $table.append($tr);
        });
    }
    
    displayMovies(movies);

    $('#add-movie').on('click', () => {
        if ($('#title').val().length > 0 && $('#rating').val() !== '') {
            let $table = $('table');

            let $tr = $('<tr>');
            let $title = $('<td>', { text: $('#title').val() });
            let $rating = $('<td>', { text: $('#rating').val() });
            let $deleteBtn = $('<button>', { text: 'Delete', class: 'delete' });
            let $tdDelete = $('<td>');
            $tdDelete.append($deleteBtn);
            
            $tr.append($title);
            $tr.append($rating);
            $tr.append($tdDelete);

            movies.push({ title: $('#title').val(), rating: $('#rating').val() });
            localStorage.setItem('movies', JSON.stringify(movies));

            $table.append($tr);
            $('#title').val('');
            $('#rating').val('');
        }

        let $delete = $('td');
        $delete.on('click', 'button', deleteMovie);
    });

    let $delete = $('td');
    $delete.on('click', 'button', deleteMovie);

    function deleteMovie(e) {
        $(e.target).parent().parent().remove();
        let $movieTitle = $(e.target).parent().parent().children()[0].innerText;

        movies = movies.filter(movie => {
            return movie.title !== $movieTitle;
        });
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    // Sort movies ascending (alphabatically) by their title
    $('#sort-title-asc').on('click', () => {
        let sorted = movies.sort((a, b) => {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        });

        localStorage.setItem('movies', JSON.stringify(sorted));
        $('table tr:gt(0)').remove();
        displayMovies(movies);
    });

    // Sort movies descending (alphabatically) by their title
    $('#sort-title-des').on('click', () => {
        let sorted = movies.sort((a, b) => {
            if (a.title < b.title) { return 1; }
            if (a.title > b.title) { return -1; }
            return 0;
        });

        localStorage.setItem('movies', JSON.stringify(sorted));
        $('table tr:gt(0)').remove();
        displayMovies(movies);
    });

    // Sort movies ascending (numerically) by their rating
    $('#sort-rating-asc').on('click', () => {
        let sorted = movies.sort((a, b) => {
            return b.rating - a.rating;
        });

        localStorage.setItem('movies', JSON.stringify(sorted));
        $('table tr:gt(0)').remove();
        displayMovies(movies);
    });

    // Sort movies descending (numerically) by their rating
    $('#sort-rating-des').on('click', () => {
        let sorted = movies.sort((a, b) => {
            return a.rating - b.rating;
        });

        localStorage.setItem('movies', JSON.stringify(sorted));
        $('table tr:gt(0)').remove();
        displayMovies(movies);
    });
});