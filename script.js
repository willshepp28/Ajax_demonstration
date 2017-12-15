$(function(){



    // how we do ajax request with jquery
    // GET/READ
    $('#get-button').on('click', () => {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: (response) => {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.products.forEach((product) => {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td class="id"><input type="text" class="name" value="' + product.name +'"></td>\
                            <td>\
                            <button class="update-button">UPDATE/PUT</button>\
                            <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                })
            }
        })
    });


    // CREATE/ POST
    $('#create-form').on('submit', (event) => {

        event.preventDefault(); // prevents form from refreshing when we send the form

        var createInput = $('#create-input');

        $.ajax({
            url: '/products',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createInput.val() }),
            success: (response) => {
            
                createInput.val(''); // empty input after we send it
                $('#get-button').click();
            }
        })
    });



    // UPDATE/ PUT
    $('table').on('click', '.update-button', function() {

        
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

  

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: (response) => {
                alert(response);
                $('#get-button').click();
            }
        })
    });



    // DELETE
    $('table').on('click', '.delete-button', function(){

        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: (response) => {
                $('#get-button').click();
            }
        });
    })




});