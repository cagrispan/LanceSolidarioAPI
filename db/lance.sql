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
  `userId` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `cep` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `userId` (`userId`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auctions`
--

DROP TABLE IF EXISTS `auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auctions` (
  `auctionId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) DEFAULT NULL,
  `institutionId` int(11) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `minimumBid` double DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `isCanceled` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`auctionId`),
  KEY `productId` (`productId`),
  KEY `institutionId` (`institutionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `auctions_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `auctions_ibfk_2` FOREIGN KEY (`institutionId`) REFERENCES `institutions` (`institutionId`),
  CONSTRAINT `auctions_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctions`
--

LOCK TABLES `auctions` WRITE;
/*!40000 ALTER TABLE `auctions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bids`
--

DROP TABLE IF EXISTS `bids`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bids` (
  `bidId` int(11) NOT NULL AUTO_INCREMENT,
  `auctionId` int(11) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `bid` double DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`bidId`),
  KEY `auctionId` (`auctionId`),
  KEY `userId` (`userId`),
  CONSTRAINT `bids_ibfk_1` FOREIGN KEY (`auctionId`) REFERENCES `auctions` (`auctionId`),
  CONSTRAINT `bids_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bids`
--

LOCK TABLES `bids` WRITE;
/*!40000 ALTER TABLE `bids` DISABLE KEYS */;
/*!40000 ALTER TABLE `bids` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emails` (
  `emailId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`emailId`),
  KEY `userId` (`userId`),
  CONSTRAINT `emails_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `images` (
  `imageId` int(11) NOT NULL AUTO_INCREMENT,
  `productId` int(11) DEFAULT NULL,
  `base64` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `productId` (`productId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institutions`
--

DROP TABLE IF EXISTS `institutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institutions` (
  `institutionId` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `about` text,
  `responsible` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `page` varchar(255) DEFAULT NULL,
  `logo` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`institutionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institutions`
--

LOCK TABLES `institutions` WRITE;
/*!40000 ALTER TABLE `institutions` DISABLE KEYS */;
/*!40000 ALTER TABLE `institutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `productId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `isUsed` tinyint(1) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT NULL,
  `isSold` tinyint(1) DEFAULT NULL,
  `isDelivered` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `userId` (`userId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `purchaseId` int(11) NOT NULL AUTO_INCREMENT,
  `auctionId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `redirectUrl` varchar(255) DEFAULT NULL,
  `reviewUrl` varchar(255) DEFAULT NULL,
  `reference` varchar(255) NOT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `isPaid` tinyint(1) DEFAULT NULL,
  `isDelivered` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`purchaseId`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `purchases_reference_unique` (`reference`),
  KEY `auctionId` (`auctionId`),
  KEY `productId` (`productId`),
  KEY `userId` (`userId`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`auctionId`) REFERENCES `auctions` (`auctionId`),
  CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `purchases_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telephones`
--

DROP TABLE IF EXISTS `telephones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `telephones` (
  `telephoneId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`telephoneId`),
  KEY `userId` (`userId`),
  CONSTRAINT `telephones_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telephones`
--

LOCK TABLES `telephones` WRITE;
/*!40000 ALTER TABLE `telephones` DISABLE KEYS */;
/*!40000 ALTER TABLE `telephones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `facebookId` varchar(255) NOT NULL,
  `facebookToken` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `facebookId` (`facebookId`),
  UNIQUE KEY `users_facebookId_unique` (`facebookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-23 15:17:52
