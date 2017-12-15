
/*
|--------------------------------------------------------------------------
|  Dependencies
|--------------------------------------------------------------------------
*/
const express = require('express'),
    PORT = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    application = express();







/*
|--------------------------------------------------------------------------
|  Data
|--------------------------------------------------------------------------
*/
var products = [
    { id: 1,  name: 'tv'},
    { id: 2, name: 'phone'}
];

var currentId = 2;



/*
|--------------------------------------------------------------------------
|  Middleware
|--------------------------------------------------------------------------
*/
application.use(express.static(__dirname))
application.use(bodyParser.json());





/*
|--------------------------------------------------------------------------
|  Routes
|--------------------------------------------------------------------------
*/

// get all products
application.get('/products', (request,response) => {
    response.send({ products: products })
})


// create products
application.post('/products', (request, response) => {
    var productName = request.body.name;
    currentId++;

    products.push({
        id: currentId,
        name: productName
    });

    response.send('Successfully created product');
});


// update product
application.put('/products/:id', (request, response) => {

    var id = request.params.id;
    var found = false;
    var newName = request.body.newName;

    products.forEach((product, index) => {

        if(!found && product.id === Number(id)) {
            product.name = newName;
        }
    });

    response.send('Successfully updated product');
})


// delete product
application.delete('/products/:id', (request, response) => {

    var id = request.params.id;
    var found = false;

    products.forEach((product, index) => {

        if(!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    response.send('Successfully deleted product');
})





/*
|--------------------------------------------------------------------------
|  Start Server
|--------------------------------------------------------------------------
*/
application.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});



