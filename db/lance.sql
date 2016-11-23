-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: lance
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `addresses` (
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
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`addressId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userIdAddress` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auctions`
--

DROP TABLE IF EXISTS `auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auctions` (
  `auctionId` int(11) NOT NULL AUTO_INCREMENT,
  `institutionId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `minimumBid` double DEFAULT NULL,
  `startDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `endDate` timestamp NULL DEFAULT NULL,
  `isCanceled` tinyint(1) DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`auctionId`),
  KEY `userId_idx` (`userId`),
  KEY `productId_idx` (`productId`),
  KEY `institutionId_idx` (`institutionId`),
  CONSTRAINT `institutionIdAuction` FOREIGN KEY (`institutionId`) REFERENCES `institutions` (`institutionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productIdAuction` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIdAuction` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bids` (
  `bidId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `bid` double NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`bidId`),
  KEY `userId_idx` (`userId`),
  KEY `auctionId_idx` (`auctionId`),
  CONSTRAINT `auctionIdBid` FOREIGN KEY (`auctionId`) REFERENCES `auctions` (`auctionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIdBid` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emails` (
  `emailId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`emailId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userIdEmail` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) NOT NULL,
  `base64` mediumtext,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`imageId`),
  KEY `productId_idx` (`productId`),
  CONSTRAINT `productIdImage` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `institutions`
--

DROP TABLE IF EXISTS `institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institutions` (
  `institutionId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(80) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `responsible` varchar(45) DEFAULT NULL,
  `about` mediumtext,
  `state` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `page` varchar(45) DEFAULT NULL,
  `logo` mediumtext,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`institutionId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(1023) NOT NULL,
  `isUsed` tinyint(1) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL,
  `isSold` tinyint(1) DEFAULT NULL,
  `isDelivered` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`productId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userIdProduct` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `purchaseId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `auctionId` int(11) NOT NULL,
  `isDelivered` tinyint(4) DEFAULT NULL,
  `isPaid` tinyint(4) DEFAULT NULL,
  `redirectUrl` varchar(255) DEFAULT NULL,
  `reviewUrl` varchar(255) DEFAULT NULL,
  `reference` varchar(255) NOT NULL,
  `currency` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchaseId`),
  UNIQUE KEY `reference_UNIQUE` (`reference`),
  KEY `productId_idx` (`productId`),
  KEY `auctionId_idx` (`auctionId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `auctionIdPurchase` FOREIGN KEY (`auctionId`) REFERENCES `auctions` (`auctionId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productIdPurchase` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userIdPurchase` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `telephones`
--

DROP TABLE IF EXISTS `telephones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telephones` (
  `telephoneId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`telephoneId`),
  KEY `userId_idx` (`userId`),
  CONSTRAINT `userIdTelephone` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `facebookId` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `facebookToken` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `users_facebookId_unique` (`facebookId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-23  2:03:13
