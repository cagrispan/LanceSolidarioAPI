-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.15-log - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Copiando estrutura para tabela lance.addresses
CREATE TABLE IF NOT EXISTS `addresses` (
  `addressId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `cep` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`addressId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.auctions
CREATE TABLE IF NOT EXISTS `auctions` (
  `auctionId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `institutionId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `minimumBid` double DEFAULT NULL,
  `startDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endDate` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isCanceled` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`auctionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.bids
CREATE TABLE IF NOT EXISTS `bids` (
  `bidId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `bid` double NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `isDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`bidId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.emails
CREATE TABLE IF NOT EXISTS `emails` (
  `emailId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`emailId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.images
CREATE TABLE IF NOT EXISTS `images` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `base64` mediumtext,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`imageId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.products
CREATE TABLE IF NOT EXISTS `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 NOT NULL,
  `description` varchar(1023) CHARACTER SET utf8 NOT NULL,
  `isUsed` tinyint(1) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `isSold` tinyint(1) DEFAULT NULL,
  `isDelivered` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.purchases
CREATE TABLE IF NOT EXISTS `purchases` (
  `purchaseId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `paymentId` int(11) DEFAULT NULL,
  `isDelivered` tinyint(4) DEFAULT NULL,
  `isPayed` tinyint(4) DEFAULT NULL,
  `deliveryId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `userId` varchar(255) NOT NULL,
  `redirectUrl` varchar(255) DEFAULT NULL,
  `reviewUrl` varchar(255) DEFAULT NULL,
  `reference` varchar(255) NOT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`purchaseId`),
  UNIQUE KEY `reference_UNIQUE` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.telephones
CREATE TABLE IF NOT EXISTS `telephones` (
  `telephoneId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `telephone` varchar(255) CHARACTER SET utf8 NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`telephoneId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.


-- Copiando estrutura para tabela lance.users
CREATE TABLE IF NOT EXISTS `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `facebookId` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `facebookToken` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updatedAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `profilePicture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `users_facebookId_unique` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Exportação de dados foi desmarcado.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
lancelancelance