$(document).ready(() => {
    $('#add-movie').on('click', () => {
        if ($('#title').val().length > 0 && $('#rating').val() !== '') {
            let $table = $('table');
            let $title = $('<td>', { text: $('#title').val() });
            let $tr = $('<tr>');
            $tr.append($title);

            let $rating = $('<td>', { text: $('#rating').val() });
            $tr.append($rating);

            let $deleteBtn = $('<button>', { text: 'Delete', class: 'delete' });
            let $tdDelete = $('<td>');
            $tdDelete.append($deleteBtn);
            $tr.append($tdDelete);

            $table.append($tr);
            $('#title').val('');
            $('#rating').val('');
        }

        let $delete = $('td');
        $delete.on('click', 'button', deleteMovie);
    });

    function deleteMovie(e) {
        $(e.target).parent().parent().remove();
    }
});