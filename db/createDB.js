'use strict';
var Sequelize = require('sequelize');
var config = require('../src/config/env.config.js');

var sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.hostdb,
        dialect: config.db.dialect,
        logging: config.db.logging
    }
);

sequelize.define('user', {
    userId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    facebookId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    facebookToken: {
        type: Sequelize.STRING,
        allowNull: false
    },
    token: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE
    },
    profilePicture: {
        type: Sequelize.STRING
    }
});

sequelize.define('addresses', {
    addressId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    street: {
        type: Sequelize.STRING
    },
    number: {
        type: Sequelize.STRING
    },
    complement: {
        type: Sequelize.STRING
    },
    neighborhood: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    cep: {
        type: Sequelize.STRING
    }
});

sequelize.define('auctions', {
    auctionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productId:{
        type: Sequelize.INTEGER,
        references: {model: 'products', key: 'productId'}
    },
    institutionId: {
        type: Sequelize.INTEGER,
        references: {model: 'institutions', key: 'institutionId'}
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    minimumBid : {
        type: Sequelize.DOUBLE
    },
    startDate: {
        type: Sequelize.DATE
    },
    endDate: {
        type: Sequelize.DATE
    },
    isCanceled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

sequelize.define('bids', {
    bidId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    auctionId:{
        type: Sequelize.INTEGER,
        references: {model: 'auctions', key: 'auctionId'}
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    bid : {
        type: Sequelize.DOUBLE
    },
    date: {
        type: Sequelize.DATE
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    }
});

sequelize.define('emails', {
    emailId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    email: {
        type: Sequelize.STRING
    }
});

sequelize.define('images', {
    imageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {model: 'products', key: 'productId'}
    },
    base64: {
        type: Sequelize.TEXT('medium')
    }
});

sequelize.define('institutions', {
    institutionId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    about: {
        type: Sequelize.TEXT('medium')
    },
    responsible: {
        type: Sequelize.STRING
    },
    telephone: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    page: {
        type: Sequelize.STRING
    },
    logo: {
        type: Sequelize.TEXT('medium')
    }
});

sequelize.define('products', {
    productId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId:{
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.TEXT('medium')
    },
    isUsed: {
        type: Sequelize.BOOLEAN
    },
    isDeleted: {
        type: Sequelize.BOOLEAN
    },
    isSold: {
        type: Sequelize.BOOLEAN
    },
    isDelivered: {
        type: Sequelize.BOOLEAN
    }
});

sequelize.define('purchases', {
    purchaseId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    auctionId:{
        type: Sequelize.INTEGER,
        references: {model: 'auctions', key: 'auctionId'}
    },
    productId: {
        type: Sequelize.INTEGER,
        references: {model: 'products', key: 'productId'}
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    redirectUrl: {
        type: Sequelize.STRING
    },
    reviewUrl: {
        type: Sequelize.STRING
    },
    reference: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
    },
    currency: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    isPaid: {
        type: Sequelize.BOOLEAN
    },
    isDelivered: {
        type: Sequelize.BOOLEAN
    }
});

sequelize.define('telephones', {
    telephoneId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.STRING,
        references: {model: 'users', key: 'facebookId'}
    },
    telephone: {
        type: Sequelize.STRING
    }
});

sequelize.sync({ force: true }).then(function(res) {
    console.log('Created');
});
