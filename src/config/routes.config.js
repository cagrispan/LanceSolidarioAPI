var AuthController = require('./../controllers/auth/auth.controller');
var AuthMiddleware = require('./../middlewares/auth.middleware');
var authController = new AuthController();
var authMiddleware = new AuthMiddleware();

var UsersController = require('./../controllers/users/users.controller');
var UsersMiddleware = require('./../middlewares/users.middleware');
var usersController = new UsersController();
var usersMiddleware = new UsersMiddleware();

var AddressesController = require('./../controllers/users/addresses.controller');
var AddressesMiddleware = require('./../middlewares/addresses.middleware');
var addressesController = new AddressesController();
var addressesMiddleware = new AddressesMiddleware();

var EmailsController = require('./../controllers/users/emails.controller');
var EmailsMiddleware = require('./../middlewares/emails.middleware');
var emailsController = new EmailsController();
var emailsMiddleware = new EmailsMiddleware();

var TelephonesController = require('./../controllers/users/telephones.controller');
var TelephonesMiddleware = require('./../middlewares/telephones.middleware');
var telephonesController = new TelephonesController();
var telephonesMiddleware = new TelephonesMiddleware();

var ProductsController = require('./../controllers/products/products.controller');
var ProductsMiddleware = require('./../middlewares/products.middleware');
var productsController = new ProductsController();
var productsMiddleware = new ProductsMiddleware();

module.exports = function (server) {

    server.opts(/\/.*/g, function (req, res) {
        res.setHeader('Access-Control-Allow-Methods', 'PUT', 'POST');
        res.setHeader('Access-Control-Allow-Headers', 'content-type, facebookid, token');
        res.setHeader('Access-Control-Allow-Origin', 'http://local.lancesolidario.com.br:8080');
        res.setHeader('Accept-Encoding', 'gzip, deflate, sdch');
        res.setHeader('Accept-Language', 'pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4');
        res.send(200);
    });

    /*
    Auth
     */
    server.post('/auth', authController.login);

    /*
    User
     */
    server.get('/users/:facebookId', [authMiddleware.isLogged, usersController.get]);
    server.put('/users/:facebookId', [authMiddleware.isLogged, usersMiddleware.hasAllInformation, usersController.update]);

    /*
    Address
     */
    server.get('/users/:facebookId/addresses', [authMiddleware.isLogged, addressesController.getAll]);
    server.post('/users/:facebookId/addresses', [authMiddleware.isLogged, addressesMiddleware.hasAllInformation, addressesController.add]);
    server.put('/users/:facebookId/addresses/:addressId', [authMiddleware.isLogged, addressesMiddleware.hasId, addressesMiddleware.hasAllInformation, addressesController.update]);
    server.del('/users/:facebookId/addresses/:addressId', [authMiddleware.isLogged, addressesMiddleware.hasId, addressesController.remove]);

    /*
    Email
     */
    server.get('/users/:facebookId/emails', [authMiddleware.isLogged, emailsController.getAll]);
    server.post('/users/:facebookId/emails', [authMiddleware.isLogged, emailsMiddleware.hasAllInformation, emailsController.add]);
    server.put('/users/:facebookId/emails/:emailId', [authMiddleware.isLogged, emailsMiddleware.hasId, emailsMiddleware.hasAllInformation, emailsController.update]);
    server.del('/users/:facebookId/emails/:emailId', [authMiddleware.isLogged, emailsMiddleware.hasId, emailsController.remove]);

    /*
    Telephone
     */
    server.get('/users/:facebookId/telephones', [authMiddleware.isLogged, telephonesController.getAll]);
    server.post('/users/:facebookId/telephones', [authMiddleware.isLogged, telephonesMiddleware.hasAllInformation, telephonesController.add]);
    server.put('/users/:facebookId/telephones/:telephoneId', [authMiddleware.isLogged, telephonesMiddleware.hasId, telephonesMiddleware.hasAllInformation, telephonesController.update]);
    server.del('/users/:facebookId/telephones/:telephoneId', [authMiddleware.isLogged, telephonesMiddleware.hasId, telephonesController.remove]);

    /*
    Products
     */
    server.get('/users/:facebookId/products', [authMiddleware.isLogged, productsController.getAll]);
    server.post('/users/:facebookId/products', [authMiddleware.isLogged, productsMiddleware.hasAllInformation, productsController.add]);
    server.put('/users/:facebookId/products/:productId', [authMiddleware.isLogged, productsMiddleware.hasId, productsMiddleware.hasAllInformation, productsController.update]);

    //### User Auctions
    //server.get('/users/:facebookId/auctions') //return auctions array
    //server.post('/users/:facebookId/auctions') //create auction
    //server.put('/users/:facebookId/auctions/:id') //update auction

    //### User Bid
    //server.get('/users/:facebookId/bids') //return bid array
    //server.post('/users/:facebookId/bids') //create bid
    //server.put('/users/:facebookId/bids/:id') //update bid

    //### User Purchases
    //server.get('/users/:facebookId/purchases') //return purchases array
    //server.post('/users/:facebookId/purchases') //create purchase
    //server.put('/users/:facebookId/purchases/:id') //update purchase

    //### Auction
    //server.get('/auctions') //return auctions array
    //server.get('/auctions/:id') //return auction

    //### Auction Bids
    //server.get('/auctions/:id/bids') //return bids array

    //### Auction Product
    //server.get('/auctions/:id/products') //return products array
};
