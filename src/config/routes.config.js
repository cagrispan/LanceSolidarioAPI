'use strict';

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

var AuctionsController = require('./../controllers/auctions/auctions.controller');
var AuctionsMiddleware = require('./../middlewares/auctions.middleware');
var auctionsController = new AuctionsController();
var auctionsMiddleware = new AuctionsMiddleware();

var BidsController = require('./../controllers/auctions/bids.controller');
var BidsMiddleware = require('./../middlewares/bids.middleware');
var bidsController = new BidsController();
var bidsMiddleware = new BidsMiddleware();

var PurchasesController = require('./../controllers/users/purchases.controller');
var PurchasesMiddleware = require('./../middlewares/purchases.middleware');
var purchasesController = new PurchasesController();
var purchasesMiddleware = new PurchasesMiddleware();

var ImagesController = require('./../controllers/products/images.controller');
var imagesController = new ImagesController();



module.exports = function (server) {

     //Auth

    server.post('/auth', authController.login);

    /*
     User
     */
    server.get('/users/:facebookId', [authMiddleware.isLogged, usersController.get]);
    server.put('/users/:facebookId', [authMiddleware.isLogged, usersMiddleware.hasAllInformation, usersController.update]);

    /*
     User Address
     */
    server.get('/users/:facebookId/addresses', [authMiddleware.isLogged, addressesController.getAll]);
    server.post('/users/:facebookId/addresses', [authMiddleware.isLogged, addressesMiddleware.hasAllInformation, addressesController.add]);
    server.put('/users/:facebookId/addresses/:addressId', [authMiddleware.isLogged, addressesMiddleware.hasId, addressesMiddleware.hasAllInformation, addressesController.update]);
    server.del('/users/:facebookId/addresses/:addressId', [authMiddleware.isLogged, addressesMiddleware.hasId, addressesController.remove]);

    /*
     User Email
     */
    server.get('/users/:facebookId/emails', [authMiddleware.isLogged, emailsController.getAll]);
    server.post('/users/:facebookId/emails', [authMiddleware.isLogged, emailsMiddleware.hasAllInformation, emailsController.add]);
    server.put('/users/:facebookId/emails/:emailId', [authMiddleware.isLogged, emailsMiddleware.hasId, emailsMiddleware.hasAllInformation, emailsController.update]);
    server.del('/users/:facebookId/emails/:emailId', [authMiddleware.isLogged, emailsMiddleware.hasId, emailsController.remove]);

    /*
     User Telephone
     */
    server.get('/users/:facebookId/telephones', [authMiddleware.isLogged, telephonesController.getAll]);
    server.post('/users/:facebookId/telephones', [authMiddleware.isLogged, telephonesMiddleware.hasAllInformation, telephonesController.add]);
    server.put('/users/:facebookId/telephones/:telephoneId', [authMiddleware.isLogged, telephonesMiddleware.hasId, telephonesMiddleware.hasAllInformation, telephonesController.update]);
    server.del('/users/:facebookId/telephones/:telephoneId', [authMiddleware.isLogged, telephonesMiddleware.hasId, telephonesController.remove]);

    /*
     User Products
     */
    server.get('/users/:facebookId/products', [authMiddleware.isLogged, productsController.getAll]);
    server.get('/users/:facebookId/products/:productId', [authMiddleware.isLogged, productsController.getSpecificProduct]);
    server.post('/users/:facebookId/products', [authMiddleware.isLogged, productsMiddleware.hasAllInformation, productsController.add]);
    server.put('/users/:facebookId/products/:productId', [authMiddleware.isLogged, productsMiddleware.hasId, productsMiddleware.hasAllInformation, productsController.update]);

    /*
     User Product Auctions
     */
    server.get('/users/:facebookId/products/:productId/auctions', [authMiddleware.isLogged, auctionsController.getAllByProduct]);

    /*
     User Auctions
     */
    server.get('/users/:facebookId/auctions', [authMiddleware.isLogged, auctionsController.getAll]);
    server.post('/users/:facebookId/auctions', [authMiddleware.isLogged, auctionsMiddleware.hasAllInformation, auctionsController.add]);
    server.put('/users/:facebookId/auctions/:auctionId', [authMiddleware.isLogged, auctionsMiddleware.hasId, auctionsMiddleware.hasAllInformation, auctionsController.update]);

    /*
     User Bids
     */
    server.get('/users/:facebookId/bids', [authMiddleware.isLogged, bidsController.getAll]);
    server.post('/users/:facebookId/bids', [authMiddleware.isLogged, bidsMiddleware.hasAllInformation, bidsController.add]);
    server.put('/users/:facebookId/bids/:bidId', [authMiddleware.isLogged, bidsMiddleware.hasId, bidsMiddleware.hasAllInformation, bidsController.update]);

    /*
     User Purchases
     */
    server.get('/users/:facebookId/purchases', [authMiddleware.isLogged, purchasesController.getAll]);
    server.get('/purchases/:reference', purchasesController.getByReference);
    server.post('/users/:facebookId/purchases', [authMiddleware.isLogged, purchasesMiddleware.hasAllInformation, purchasesController.add]);
    server.put('/users/:facebookId/purchases/:purchaseId', [authMiddleware.isLogged, purchasesMiddleware.hasId, purchasesMiddleware.hasAllInformation, purchasesController.update]);

    /*
     Auctions
     */
    server.get('/auctions', [auctionsController.getAll]);
    server.get('/auctions/:auctionId', [auctionsController.getOne]);

    /*
     Auction Bids
     */
    server.get('/auctions/:auctionId/bids', [bidsController.getAll]);

    /*
     Auction Product
     */
    server.get('/auctions/:auctionId/products', [auctionsController.getProducts]);

    /*
    Images
     */
    server.post('/users/:facebookId/products/:productId/images', [authMiddleware.isLogged, imagesController.add]);
    server.get('/users/:facebookId/products/:productId/images', [authMiddleware.isLogged, imagesController.get]);
    server.del('/users/:facebookId/products/:productId/images/:imageId', [authMiddleware.isLogged, imagesController.remove]);
};
